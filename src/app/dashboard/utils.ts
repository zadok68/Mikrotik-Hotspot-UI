export const LIMITS = {
    LIMITED: "Limited",
    UNLIMITED: "Unlimited"
}

export function getDescription(plan: InternetPlan) {
    const { limit } = plan
    let result = ""
    if (limit.type.localeCompare(LIMITS.LIMITED) === 0) {
        if (limit.data.value !== 0) {
            result += `${limit.data.value}${limit.time.unit}`
        } else {
            result += "Unlimited Internet"
        }

        if (limit.time.value !== 0) {
            result += ` valid for ${limit.time.value} ${limit.time.unit}`
        }
    } else {
        result += "Unlimited Internet"

        if (limit.time.value !== 0) {
            result += ` valid for ${limit.time.value} ${limit.time.unit}`
        }
    }
    return result
}

function setCookie(cookieName: string, cookieValue: string | number, daysToExpire: number): void {
    let expires = "";
    if (daysToExpire) {
        const date = new Date();
        date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = `${cookieName}=${encodeURIComponent(cookieValue.toString())}${expires}; path=/`;
}

function getCookie(cookieName: string) {
    const nameEQ = `${cookieName}=`;
    const cookiesArray = document.cookie.split(';');
    for (let i = 0; i < cookiesArray.length; i++) {
        let cookie = cookiesArray[i].trim();
        if (cookie.indexOf(nameEQ) === 0) {
            return decodeURIComponent(cookie.substring(nameEQ.length, cookie.length));
        }
    }
    return null;
}

function formatPhoneNumber(phoneNumber: string) {
    if (phoneNumber.startsWith('+')) {
        phoneNumber = phoneNumber.substring(1);
    }
    if (phoneNumber.startsWith('0')) {
        phoneNumber = '254' + phoneNumber.substring(1);
    }
    if (phoneNumber.match(/^(7|1)/)) {
        phoneNumber = '254' + phoneNumber;
    }
    return phoneNumber;
}

export async function purchasePlan({ plan, phone, mac }: { plan: InternetPlan, phone: string, mac: string }) {
    const formattedPhoneNumber = formatPhoneNumber(phone);
    const lastFourChars = mac.slice(-4);
    // const username = `${formattedPhoneNumber}-${lastFourChars}`;

    try {
        localStorage.setItem('phoneNumber', formattedPhoneNumber);
        localStorage.setItem('lastFourChars', lastFourChars);
    } catch (e) {
        setCookie('phoneNumber', formattedPhoneNumber, 1);
        setCookie('lastFourChars', lastFourChars, 1);
    }

    try {
        console.log({ plan, phone, mac })
        const response = await fetch('https://zeiteck.freeispradius.com/index.php?_route=plugin/CreateHotspotuser&type=grant', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                phone_number: formattedPhoneNumber,
                plan_id: plan.id,
                router_id: plan.router,
                mac_address: lastFourChars
            }),
        });

        console.log({ response })

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (data.status === 'error') {
            throw new Error(data.message);
        }

        // Set the expiration time for the paymentSubmitted flag (2 minutes from now)
        const expirationTime = new Date().getTime() + (1 * 60 * 1000);

        try {
            localStorage.setItem('paymentSubmittedExpiration', expirationTime.toString());
            localStorage.setItem('paymentSubmitted', 'true');
        } catch (e) {
            setCookie('paymentSubmittedExpiration', expirationTime.toString(), 1);
            setCookie('paymentSubmitted', 'true', 1);
        }

        return formattedPhoneNumber;
    } catch (error) {
        console.error('Error:', error);
        // Perform any necessary error handling
        throw error; // Rethrow the error if you want to propagate it
    }
}

export async function verifyPayment(phoneNumber: string, tries: number = 0): Promise<boolean> {
    let result = false;
    try {
        const response = await fetch('https://zeiteck.freeispradius.com/index.php?_route=plugin/CreateHotspotuser&type=verify', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ phone_number: phoneNumber })
        });

        const data = await response.json();

        if (data.Resultcode === "3") {
            console.log("Payment successful. Redirecting...");
            result = true;
            // Perform any necessary actions upon successful payment
        } else if (data.Resultcode === "2") {
            console.log("Payment failed or cancelled. Error: " + data.Message);
            // Perform any necessary actions upon payment failure or cancellation
            // Clear the payment submission flags from localStorage
            try {
                localStorage.removeItem('paymentSubmitted');
                localStorage.removeItem('paymentSubmittedExpiration');
            } catch (e) {
                setCookie('paymentSubmitted', '', -1);
                setCookie('paymentSubmittedExpiration', '', -1);
            }
        } else if (data.Resultcode === "1") {
            console.log("Payment pending. Message: " + data.Message);
            if (tries != 3) {
                setTimeout(() => {
                    verifyPayment(phoneNumber, tries + 1);
                }, 2000)
            }
        } else {
            console.log("Unknown response code: " + data.Resultcode);
        }
    } catch (error) {
        console.log("Error: " + error);
        // Perform any necessary error handling
    } finally {
        return result;
    }
}

async function SignIn(params:{}) {
    
}