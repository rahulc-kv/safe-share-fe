export type ShowNotifierPayloadType = {
  payload: {
    message: string;
    type: string;
    id?: string;
    autoHideDisabled?: boolean;
  };
};
