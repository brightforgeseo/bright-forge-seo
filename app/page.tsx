import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const whyChooseUsPoints = [
  "Globally Inspired Strategies",
  "Tailored Solutions",
  "Ethical and Transparent Practices",
  "Data-Driven Insights",
  "Clear Communication",
];

const coreSeoPillars = [
  { title: "SEO Audit", description: "Comprehensive analysis of your website's SEO health." },
  { title: "Keyword Strategy", description: "Identifying and targeting high-value keywords." },
  { title: "On-Page SEO", description: "Optimizing content and HTML source code." },
  { title: "Link Building", description: "Acquiring high-quality backlinks to boost authority." },
  { title: "Technical SEO", description: "Ensuring your website is crawlable and indexable." },
  { title: "Content SEO", description: "Creating and optimizing content to rank higher." },
];

const processSteps = [
  { title: "In-Depth Website Audit", description: "We start with a thorough examination of your site's current SEO performance, identifying strengths, weaknesses, and opportunities." },
  { title: "Custom Strategy Development", description: "Based on the audit, we craft a bespoke SEO strategy tailored to your specific business goals and target audience." },
  { title: "Execution and Optimization", description: "Our team implements the strategy, continuously optimizing campaigns for maximum impact and ROI." },
  { title: "Continuous Performance Monitoring", description: "We track key metrics, providing regular reports and adjusting tactics to ensure sustained growth and success." },
];

const caseStudiesData = [
  { id: 1, title: "E-commerce Growth", imageUrl: "/case1.png", description: "Achieved 150% increase in organic traffic for an online retailer." },
  { id: 2, title: "Local SEO Success", imageUrl: "/case2.png", description: "Ranked a local business #1 for 10+ competitive keywords." },
  { id: 3, title: "SaaS Lead Generation", imageUrl: "/case3.png", description: "Doubled organic leads for a B2B SaaS company in 6 months." },
];

const testimonialsData = [
  { id: 1, quote: "Bright Forge SEO transformed our online presence! Their strategies are top-notch and delivered real results." },
  { id: 2, quote: "The team is knowledgeable, responsive, and truly cares about their clients' success. Highly recommended!" },
  { id: 3, quote: "We've seen a significant increase in traffic and leads since partnering with Bright Forge. Thank you!" },
  { id: 4, quote: "Ethical, transparent, and effective. They are the go-to SEO agency in the Philippines." },
];

const clientLogos = [
  { src: "/logo1.png", alt: "Client Logo 1" },
  { src: "/logo2.png", alt: "Client Logo 2" },
  { src: "/logo3.png", alt: "Client Logo 3" },
  { src: "/logo4.png", alt: "Client Logo 4" },
  { src: "/logo5.png", alt: "Client Logo 5" },
];

export default function Homepage() {
  return (
    <div className="flex flex-col gap-10 p-6 md:p-12">

      {/* Hero Section */}
      <section className="grid md:grid-cols-2 items-center gap-10">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Leading SEO Agency in the <span className="text-orange-500">Philippines</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Bright Forge SEO helps businesses thrive online with focused strategies.
          </p>
          <Button className="mt-6 bg-orange-500 hover:bg-orange-600 text-white">
            Get Your Free SEO Audit
          </Button>
        </div>
        <img src="/hero-image.jpg" alt="SEO Expert team collaborating" className="rounded-xl shadow-lg" />
      </section>

      {/* Logos and Trust Section */}
      <section className="flex flex-wrap justify-center items-center gap-8 py-8">
        {clientLogos.map((logo) => (
          <img key={logo.alt} src={logo.src} alt={logo.alt} className="h-10" />
        ))}
      </section>

      {/* Why Choose Us */}
      <section className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">Why Choose Bright Forge SEO?</h2>
          <ul className="space-y-3 text-gray-700">
            {whyChooseUsPoints.map((point) => (
              <li key={point} className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
                {point}
              </li>
            ))}
          </ul>
          <Button className="mt-6 bg-orange-500 hover:bg-orange-600 text-white">
            Free SEO Consultation
          </Button>
        </div>
        <img src="/team-image.jpg" alt="Bright Forge SEO team working together" className="rounded-xl shadow-lg" />
      </section>

      {/* Core SEO Pillars */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-center">Core SEO Pillars</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {coreSeoPillars.map(pillar => (
            <Card key={pillar.title} className="p-4 text-center">
              <CardContent>
                <h3 className="font-semibold text-xl text-orange-500 mb-2">{pillar.title}</h3>
                <p className="text-sm text-gray-600">{pillar.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Step-by-Step Process */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-center">Our Step-by-Step Process</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {processSteps.map((step) => (
            <Card key={step.title} className="p-4">
              <CardContent>
                <h3 className="font-semibold text-lg">{`0${processSteps.indexOf(step) + 1}. ${step.title}`}</h3>
                <p className="text-sm text-gray-600 mt-2">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Case Studies */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-center">SEO Case Studies</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {caseStudiesData.map(study => (
            <Card key={study.id}>
              <CardContent className="p-4">
                <img src={study.imageUrl} alt={`Case Study: ${study.title}`} className="rounded mb-4 w-full h-48 object-cover" />
                <h3 className="font-bold text-lg">{study.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{study.description}</p>
                <Button variant="link" className="text-orange-500 p-0 hover:text-orange-600">Learn More</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-6">What Our Clients Say</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonialsData.map(testimonial => (
            <Card key={testimonial.id} className="bg-pink-50 p-4">
              <CardContent>
                <p className="text-sm text-gray-800">"{testimonial.quote}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="grid md:grid-cols-2 gap-10 bg-pink-50 p-6 md:p-10 rounded-xl">
        <div>
          <h2 className="text-3xl font-bold mb-4">Get in touch <span className="text-orange-500">today</span></h2>
          <p className="text-gray-700">Let's scale your business with proven SEO strategies. Contact us to get started.</p>
          <div className="mt-6 space-y-2">
            <p><strong>Email:</strong> seo@brightforgeseo.com</p>
            <p><strong>Phone:</strong> (+63) 969 620 6182</p>
            <p><strong>Address:</strong> Quezon City, Metro Manila</p>
          </div>
        </div>
        <form className="space-y-4">
          <div>
            <label htmlFor="firstName" className="sr-only">First Name</label>
            <input id="firstName" name="firstName" type="text" placeholder="First Name" className="w-full p-3 rounded border border-gray-300 focus:ring-orange-500 focus:border-orange-500" />
          </div>
          <div>
            <label htmlFor="emailAddress" className="sr-only">Email Address</label>
            <input id="emailAddress" name="emailAddress" type="email" placeholder="Email Address" className="w-full p-3 rounded border border-gray-300 focus:ring-orange-500 focus:border-orange-500" />
          </div>
          <div>
            <label htmlFor="phone" className="sr-only">Phone</label>
            <input id="phone" name="phone" type="text" placeholder="Phone" className="w-full p-3 rounded border border-gray-300 focus:ring-orange-500 focus:border-orange-500" />
          </div>
          <div>
            <label htmlFor="message" className="sr-only">Write A Message</label>
            <textarea id="message" name="message" placeholder="Write A Message" className="w-full p-3 rounded border border-gray-300 h-32 focus:ring-orange-500 focus:border-orange-500"></textarea>
          </div>
          <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white w-full p-3">Send Message</Button>
        </form>
      </section>

    </div>
  );
} 