import axios from 'axios'

const API_URL = 'https://api.fda.gov/drug/drugsfda.json'

export const partialSearch = async (search: string): Promise<string[]> => {
    try {
        const response = await axios.get(`${API_URL}?search=openfda.generic_name:${search}*&limit=5`)
        const drugs: string[] = response.data.results.flatMap((result: { openfda: { generic_name: string } }) => result.openfda?.generic_name[0] ?? []);
        return [... new Set(drugs)]
    } catch (error) {
        console.error("An error occurred while fetching the data", error)
        return []
    }
}

export const getDrugs = async (search: string, page: number = 1, limit: number = 10) => {
    try {
        const response = await axios.get(`${API_URL}?search=openfda.generic_name:${search}&limit=${limit}&skip=${(page - 1) * limit}`)
        return response.data//.results.filter((result: { openfda: { generic_name: string } }) => result.openfda?.generic_name !== undefined)
    } catch (error) {
        console.error("An error occurred while fetching the data", error)
        return []
    }
}

export const getDrug = async (id: string) => {
    try {
        const response = await axios.get(`${API_URL}?search=application_number:${id}`)
        return response.data.results[0]
    } catch (error) {
        console.error("An error occurred while fetching the data", error)
        return null
    }
}