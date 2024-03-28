import paypal from "@paypal/checkout-server-sdk";

export const environment = () => {
  let clientId = 'AXuOjgzt6W-QIfFfpgpyFBs8WUvF3DsmoI8GVCnzBh4TxLr_q0Qhn_ptCGhGLX_-2_aoKv1-0YXg-tvw';
  let secret = 'ECI1vbOic-RIco2PQjrhwcinHGZgkNRN3G9ZyB1Go3fiEqUuQgphwWMUkkOPMN_eZAiFqcG8gzUV3atu';

  return new paypal.core.SandboxEnvironment(clientId, secret);
}

export const client = () => {
  return new paypal.core.PayPalHttpClient(environment());
}