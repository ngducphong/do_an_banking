import axios from "axios";

// Base instance of axios for reusability
const api = axios.create({
    baseURL: 'https://provinces.open-api.vn/api',
});

// Fetch provinces
export const fetchProvinces = async () => {
    try {
        const response = await api.get('/?depth=1');
        return response.data;
    } catch (error) {
        console.error('Error fetching provinces:', error.message);
        throw error; // Rethrow to handle it elsewhere if needed
    }
};

// Fetch districts by province ID
export const fetchDistricts = async (provinceId) => {
    try {
        const response = await api.get(`/p/${provinceId}?depth=2`);
        return response.data.districts;
    } catch (error) {
        console.error('Error fetching districts:', error.message);
        throw error;
    }
};

// Fetch wards by district ID
export const fetchWards = async (districtId) => {
    try {
        const response = await api.get(`/d/${districtId}?depth=2`);
        return response.data.wards;
    } catch (error) {
        console.error('Error fetching wards:', error.message);
        throw error;
    }
};
