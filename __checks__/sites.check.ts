import { ApiCheck, AssertionBuilder } from "checkly/constructs";

const SITE = "https://nabil-takiyuddin.dev";
const IDSS = "https://idss.nabil-takiyuddin.dev";

// Responses slower than this are flagged as degraded; past the max they fail.
const timing = { degradedResponseTime: 3000, maxResponseTime: 10000 };

new ApiCheck("portfolio-home", {
  name: "Portfolio: home page",
  ...timing,
  request: {
    url: `${SITE}/`,
    method: "GET",
    followRedirects: true,
    assertions: [
      AssertionBuilder.statusCode().equals(200),
      AssertionBuilder.textBody().contains("Nabil Takiyuddin"),
    ],
  },
});

new ApiCheck("portfolio-case-study", {
  name: "Portfolio: MyFlood case study",
  ...timing,
  request: {
    url: `${SITE}/projects/myflood`,
    method: "GET",
    followRedirects: true,
    assertions: [
      AssertionBuilder.statusCode().equals(200),
      AssertionBuilder.textBody().contains("MyFlood"),
    ],
  },
});

new ApiCheck("portfolio-sitemap", {
  name: "Portfolio: sitemap.xml",
  ...timing,
  request: {
    url: `${SITE}/sitemap.xml`,
    method: "GET",
    followRedirects: true,
    assertions: [
      AssertionBuilder.statusCode().equals(200),
      AssertionBuilder.textBody().contains("/projects/"),
    ],
  },
});

// GET /api/contact is a health check: 200 when the function runs and the email
// service is configured, 503 when the form would fall back to mailto:. Sends nothing.
new ApiCheck("portfolio-contact-api", {
  name: "Portfolio: contact API is up",
  ...timing,
  request: {
    url: `${SITE}/api/contact`,
    method: "GET",
    assertions: [
      AssertionBuilder.statusCode().equals(200),
      AssertionBuilder.jsonBody("$.status").equals("ok"),
    ],
  },
});

new ApiCheck("idss-web-home", {
  name: "IDSS web app: home page",
  tags: ["idss-web"],
  ...timing,
  request: {
    url: `${IDSS}/`,
    method: "GET",
    followRedirects: true,
    assertions: [AssertionBuilder.statusCode().equals(200)],
  },
});
