import { stringify } from 'query-string';
import { fetchUtils } from 'ra-core';


const Provider =(apiUrl, httpClient = fetchUtils.fetchJson) => ({
    getList: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const { RoleId, ...otherFilters } = params.filter || {};
        const query = {
            ...fetchUtils.flattenObject(otherFilters), // Use other filters excluding RoleId
            _sort: field,
            _order: order,
            _start: (page - 1) * perPage,
            _end: page * perPage,
        };
    
        if (RoleId) {
            query.RoleId = RoleId;
        }
    
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
    
        return httpClient(url).then(({ headers, json }) => {
            if (!headers.has('x-total-count')) {
                throw new Error(
                    'The X-Total-Count header is missing in the HTTP Response. The jsonServer Data Provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare X-Total-Count in the Access-Control-Expose-Headers header?'
                );
            }
            return {
                data: json,
                total: parseInt(
                    headers.get('x-total-count').split('/').pop(),
                    10
                ),
            };
        });
    }
    ,

    getOne: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
            data: json,
        })),

    getMany: (resource, params) => {
        const query = {
            id: params.ids,
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        return httpClient(url).then(({ json }) => ({ data: json }));
    },

    getManyReference: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            ...fetchUtils.flattenObject(params.filter),
            [params.target]: params.id,
            _sort: field,
            _order: order,
            _start: (page - 1) * perPage,
            _end: page * perPage,
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({ headers, json }) => {
            if (!headers.has('x-total-count')) {
                throw new Error(
                    'The X-Total-Count header is missing in the HTTP Response. The jsonServer Data Provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare X-Total-Count in the Access-Control-Expose-Headers header?'
                );
            }
            return {
                data: json,
                total: parseInt(
                    headers.get('x-total-count').split('/').pop(),
                    10
                ),
            };
        });
    },

    // json-server doesn't handle filters on UPDATE route, so we fallback to calling UPDATE n times instead
    updateMany: (resource, params) =>
        Promise.all(
            params.ids.map(id =>
                httpClient(`${apiUrl}/${resource}/${id}`, {
                    method: 'PUT',
                    body: JSON.stringify(params.data),
                })
            )
        ).then(responses => ({ data: responses.map(({ json }) => json.id) })),
    create: (resource, params) => {
        try{
        if (resource === 'cars') {
          const formData = new FormData();
      
          // Check if there's a single image or multiple images
          if (Array.isArray(params.data.images) && params.data.images.length > 0) {
            // If there are multiple images, append them to the imagesArray
            params.data.images.forEach((imageFile) => {
              if (imageFile.url.rawFile instanceof File) {
                formData.append('images',imageFile.url.rawFile);
              }
            });
          } else if (params.data.imageUrl && params.data.imageUrl.rawFile instanceof File) {
            // If there's only a single image, append it to the imagesArray
            formData.append('images',params.data.imageUrl.rawFile);
          }
      
          const { images, imageUrl, ...otherParams } = params.data;
      
          formData.append('data', JSON.stringify(otherParams));
      
          return httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: formData
          }).then(({ json }) => ({ data: { ...params.data, id: json.id } }));
        } else {
            console.log("test");
            
          return httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
          }).then(({ json }) => ({
            data: { ...params.data, id: json.id },
          }));
        }
    }catch(e){
        console.log("Create Error:", e);
    }
      },
    delete: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'DELETE',
        }).then(({ json }) => ({ data: json })),

    // json-server doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
    deleteMany: (resource, params) =>
        Promise.all(
            params.ids.map(id =>
                httpClient(`${apiUrl}/${resource}/${id}`, {
                    method: 'DELETE',
                })
            )
        ).then(responses => ({ data: responses.map(({ json }) => json.id) })),
    update: (resource, params) => {
        if (resource === 'foods') {
            const formData = new FormData();

            if (params.data.imageUrl && params.data.imageUrl.rawFile instanceof File) {
                formData.append('image', params.data.imageUrl.rawFile);
            }

            const { imageUrl, ...otherParams } = params.data;

            formData.append('data', JSON.stringify(otherParams));

            return httpClient(`${apiUrl}/${resource}/${params.id}`, {
                method: 'PUT',
                body: formData,
            }).then(({ json }) => ({ data: { id: params.id, ...json } }));
        } else {
            return httpClient(`${apiUrl}/${resource}/${params.id}`, {
                method: 'PUT',
                body: JSON.stringify(params.data),
            }).then(({ json }) => ({ data: { id: params.id, ...json } }));
        }
    }
});


export default Provider;