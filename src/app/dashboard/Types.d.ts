interface UnitValue {
  unit: string;
  value: number;
}

interface Limit {
  type: string;
  data: UnitValue;
  time: UnitValue;
}

interface InternetPlan {
  id: string | number;
  name: string;
  router: number,
  price: UnitValue
  bandwidth: {
    up: UnitValue;
    down: UnitValue;
  };
  limit: Limit;
}

interface ActiveInternetPlan extends InternetPlan {
  balance: {
    data: UnitValue;
    time: UnitValue;
  };
  expires: Date | string;
}
