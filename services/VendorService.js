import BaseService from '~/services/BaseService.js'

let instance = null
class VendorService extends BaseService {
  constructor() {
    super('vendor')
  }

  static getInstance() {
    if (!instance) {
      instance = new VendorService()
    }
    return instance
  }

  async getVendor(params = {}) {
    // Transform query parameters to a query string
    const queryParams = new URLSearchParams(params).toString();

    // Append query string to the endpoint if params exist
    const url = queryParams ? `${this._prefix}?${queryParams}` : this._prefix;

    // Make the API call and return the result
    return await this._get(url);
  }

  async getPendingVendor(params = {}) {
    // Transform query parameters to a query string
    const queryParams = new URLSearchParams(params).toString();

    // Append query string to the endpoint if params exist
    const url = queryParams ? `${this._prefix}/pending?${queryParams}` : this._prefix;

    // Make the API call and return the result
    return await this._get(url);
  }

  async getVendorDetail(id) {
    if (!id) {
      throw new Error('Vendor ID is required to fetch details.');
    }

    const url = `${this._prefix}/${id}`;
    return await this._get(url); // Assuming _get is a defined method for API calls
  }
  async vendorApprove(id) {
    return await this._post(`${this._prefix}/approve/${id}`, id)
  }
  async vendorReject(id) {
    return await this._post(`${this._prefix}/reject/${id}`, id)
  }

}export default VendorService
