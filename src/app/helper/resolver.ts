import {AxiosPromise} from "axios";

export const resolver = async (promise: AxiosPromise) => {
    const resolved = {
        data: null,
        error: null
    };

    try {
        // @ts-ignore
        resolved.data = await promise;
    } catch (e) {
        // @ts-ignore
        resolved.error = e.response.data;
    }

    return resolved;
}