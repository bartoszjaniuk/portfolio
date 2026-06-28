export function generateWebsiteStructuredData(url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Bartosz Janiuk",
    description:
      "Digital workshop where idea meets product. Mobile and web applications for your business.",
    url: url,
    author: {
      "@type": "Person",
      name: "Bartosz Janiuk",
      url: "https://github.com/bartoszjaniuk",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${url}/blog?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function generatePersonStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Bartosz Janiuk",
    url: "https://bartoszjaniuk.pl",
    image: "https://bartoszjaniuk.pl/developer-portrait.png",
    sameAs: [
      "https://github.com/bartoszjaniuk",
      "https://twitter.com/bartoszjaniuk",
      "https://linkedin.com/in/bartoszjaniuk",
    ],
    jobTitle: "Software Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Bartosz Janiuk",
    },
  };
}
