import baseApi from "../../services/api";

const IncidentsListApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getIncidentsList: builder.query<
      any,
      void
    >({
      query: () => "/all?fields=name",
      transformResponse: (response: any) =>
        response,
      providesTags: ['GetIncidentsList']
    }),
  })
});

export const {
  useGetIncidentsListQuery
} = IncidentsListApi;