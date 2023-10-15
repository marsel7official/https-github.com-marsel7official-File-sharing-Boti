import { SAMLProfile } from '@boxyhq/saml20/dist/typings';
import SAMLTracer from '.';

export interface Trace {
  traceId: string;
  timestamp: number;
  error: string;
  context: {
    [key: string]: unknown;
  };
}

export interface SAMLTrace extends Omit<Trace, 'traceId' | 'timestamp'> {
  timestamp?: number /** Can be passed in from outside else will be set to Date.now() */;
  context: Trace['context'] & {
    tenant: string;
    product: string;
    clientID: string;
    redirectUri?: string;
    requestedOIDCFlow?: boolean; // Type of OAuth client request
    isSAMLFederated?: boolean; // true if hit the SAML Federation flow
    isIDPFlow?: boolean; // true if IdP Login flow
    relayState?: string; // RelayState in SP flow
    providerName?: string; // SAML Federation SP
    acsUrl?: string; // ACS Url of SP in SAML Federation flow
    entityId?: string; // Entity ID of SP in SAML Federation flow
    samlRequest?: string; // Generated SAML Request
    samlResponse?: string; // Raw SAML response from IdP
    issuer?: string; // Parsed issuer from samlResponse
    profile?: SAMLProfile; // Profile extracted from samlResponse
  };
}

export type SAMLTracerInstance = InstanceType<typeof SAMLTracer>;
