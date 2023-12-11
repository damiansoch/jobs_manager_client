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
