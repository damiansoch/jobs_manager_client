export class AddCustomerRequestDto {
  constructor() {
    //For customer
    this.FirstName = '';
    this.LastName = '';
    this.CompanyName = '';
    //For contact
    this.PhoneNumber = '';
    this.PhoneNumber2 = null;
    this.Email = '';
    this.ExtraDetails = null;
  }
}
export class UpdateCustomerRequestDto {
  constructor() {
    //For customer
    this.FirstName = '';
    this.LastName = '';
    this.CompanyName = '';
  }
}

export class UpdateJobRequestDto {
  constructor() {
    this.Name = '';
    this.Description = '';
    this.Price = 0.0;
    this.Deposit = 0.0;
    this.ToBeCompleted = '';
  }
}
