import { Price } from "@/types";

// Fetches the URL whether the app is deployed on Vercel, localhost, etc.
export const getURL = () => {
  // Automatically update the URL when the web app is deployed on Vercel.
  // Include an option for falling back on localhost deployment.
  let url = process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.NEXT_PUBLIC_VERCEL_URL ??
    "http://localhost:3000";

  // If the URL has been changed, make sure it's still secure
  url = url.includes("http") ? url : `https://${url}`;

  // Ensure there's a trailing slash in the URL
  url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;

  return url;
}

// postData method accepts a URL and an optional Price object
// and returns a response to a POST request
export const postData = async ({ url, data }: {
  url: string;
  data?: { price: Price };
}) => {
  console.log("POST REQUEST: ", url, data);

  // Fetch a response to the POST request
  const response: Response = await fetch(url, {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    credentials: "same-origin",
    body: JSON.stringify(data)
  });

  // If the response wasn't successful, log it and throw an error
  if (!response.ok) {
    console.log("POST error: ", { url, data, response });
    throw new Error(response.statusText);
  }

  return response.json();
}

// Set the seconds value in the Date object to the local time
export const toDateTime = (sec: number) => {
  // Initialize time as the UNIX epoch and update to current time
  var time = new Date("1970-01-01T00:30:00Z");
  time.setSeconds(sec);

  return time;
}
