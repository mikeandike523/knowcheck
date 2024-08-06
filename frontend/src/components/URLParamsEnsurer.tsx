import { Div, H1 } from "@/fwk/html";
import theme from "@/themes/main";
import { Fragment, ReactNode, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

/**
 * A simple, reusable component to warn th end user
 * if their URL is malformed and therefore the URL parameters are missing
 * 
 * @remarks
 * When the main content is wrapped in this component,
 * it is safe to use the non-null-assertion-operator (!) on results from `useParams()`
 * elsewhere in the parent component
 */
export default function URLParamsEnsurer({
  urlFormat,
  requiredParameters = [],
  dynamicallyComputeHost = true,
  children,
}: {
  /**
   * A string summarizing the intended format of the URL allowing users
   * to be more educated about what the URL should look like
   * and why we report a missing URL parameter
   */
  urlFormat?: string;
  /**
   * An list of parameters that are required for the URL
   */
  requiredParameters?: string[];
  /**
   * If true, we assume the provided URL format is relative
   * And we derive information about the protocol and host from the window object
   */
  dynamicallyComputeHost?: boolean;
  /**
   *
   */
  children?: ReactNode | ReactNode[];
}) {
  const foundParams = useParams();
  const missingParameters = requiredParameters.filter(
    (param) => foundParams[param] === undefined
  );
  const [urlInfo, setUrlInfo] = useState<{
    protocol: string;
    host: string;
  } | null>(
    // In the future, this proejct may be migrated from Vite + Firebase Functions to NextJS + Vercel
    // This whole procedure is simply to account for NextJS
    // server side rendering
    // So in other cases, we can assume that is window is defined, that we can safely
    // obtain the required properties
    // Note that typescript always assumes its defined due to how globals work
    // This means that technically speaking
    // In NextJS there is a chance that an object that the compiler assumes is defined
    // is actually undefined at runtime
    // SMH :(
    typeof window === "object"
      ? {
          protocol: window.location.protocol,
          host: window.location.host,
        }
      : null
  );
  useEffect(() => {
    if (dynamicallyComputeHost) {
      const { protocol, host } = window.location;
      setUrlInfo({ protocol, host });
    } else {
      setUrlInfo(null);
    }
  }, []);
  const resolveUrlFormat =
    typeof urlFormat === "undefined"
      ? undefined
      : dynamicallyComputeHost
        ? `${urlInfo?.protocol ?? "(unknown protocol)"}//${urlInfo?.host ?? "(unknown host)"}/${urlFormat.replace(/^\/+/g, "")}`
        : urlFormat;
  const paramsMessage =
    missingParameters.length > 1
      ? `The following parameters are missing from the URL: ${missingParameters.join(", ")}`
      : `The parameter ${missingParameters[0]} is missing from the URL.`;
  const warningComponent = (
    <Div
      margin={theme.gutters.lg}
      padding={theme.gutters.lg}
      border="2px solid red"
      color="red"
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={theme.gutters.md}
    >
      <H1>Malformed URL</H1>
      <p>
        The requested page cannot be displayed because some URL parameters are
        missing
      </p>
      <p>{paramsMessage}</p>
      {resolveUrlFormat && (
        <p>
          The URL should follow the following format:{" "}
          <pre>
            <code>{resolveUrlFormat}</code>
          </pre>
        </p>
      )}
    </Div>
  );
  return missingParameters.length > 0 ? (
    <Fragment key="WarningOrContent">{warningComponent}</Fragment>
  ) : (
    <Fragment key="WarningOrContent">{children}</Fragment>
  );
}
