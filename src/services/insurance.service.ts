import insuranceApi from '../api/api';
import { Insurance } from '../interfaces/insurance';

const token = {token: '1234'}

class InsuranceService {

  async create(insurance: Insurance) {
    return insuranceApi
      .post("/insurance", insurance, {headers: token})
      .then((response) => {        
        return response.data;
      }).catch(({response}) => {
        return response.data;
      });
  }

  async update(insurance: Insurance, id: number) {
    return insuranceApi
      .put(`/insurance/${id}`,insurance, {headers: token})
      .then((response) => {        
        return response.status;
      }).catch(({response}) => {
        return response.data;
      });
  }

  async getAll() : Promise<Insurance[]> {
    return insuranceApi
      .get("/insurance", {headers: token})
      .then((response) => {        
        return response.data.data;
      }).catch(({response}) => {
        return response.data;
      });
  }

  async delete(id: number)  {
    return insuranceApi
      .delete(`/insurance/${id}`, {headers: token})
      .then((response) => {        
        return response.status;
      }).catch(({response}) => {
        return response.data;
      });
  }
}

export default new InsuranceService();