export type ValidationError = {
  property: string;
  constraints:
    | {
        [type: string]: string;
      }
    | undefined;
};

export type User = {
  id: string;
  email: string;
  fullname?: string;
  dob?: Date;
  nric?: string;
};
