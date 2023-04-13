export interface ProductData {
  manufacturingDate: string;
  batchID: string;
  productName: string;
  expiryDate: string;
  intendedMarket: string;
  milkCollectionDate: string;
  lastQualityDate: string;
  customsClearanceCertificateData: string;
}

interface ProductMetadata {
  schemaId: number;
  data: ProductData;
}

export interface ProductErrors {
  code: number;
  message: string;
}

export interface Error {
  code: string;
  error: string;
  message: string;
  path: string;
  status: number;
  timestamp: string;
}

export interface Product {
  code: string;
  metadata?: ProductMetadata;
  validationCount?: number;
  result: {
    status: string;
    errors: Array<ProductErrors>;
  };
  recalls?: Object;
}

export interface TimelineEvent {
  eventTime: number;
  disposition: string;
  bizStep: string;
  location: {
    name: string;
    country: {
      code: string;
      name: string;
    };
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  type: string;
}

export interface Timeline {
  self: {
    code: string;
    packageType: {
      name: string;
      type: string;
      material: string;
    };
  };
  events: {
    event: Array<TimelineEvent>;
  };
}
