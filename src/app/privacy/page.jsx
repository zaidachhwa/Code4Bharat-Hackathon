import React from "react";
import Navbar from "../_components/Navbar";
import Footer from "../_components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1">
        <section className="px-4 sm:px-6 lg:px-8 pt-28 pb-16">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm px-6 py-8 sm:px-10 sm:py-10 md:px-12 md:py-12">
              
              {/* Header */}
              <div className="mb-8 border-b border-slate-200 pb-6">
                <p className="text-xs font-medium tracking-[0.16em] text-slate-500 uppercase mb-2">
                  Legal & Privacy
                </p>

                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">
                  Privacy Policy
                </h1>

                <p className="text-sm text-slate-600 leading-relaxed">
                  This Privacy Policy describes how{" "}
                  <span className="font-semibold text-slate-800">
                    Code4Bharat
                  </span>{" "}
                  collects, uses, discloses, and protects personal data and the
                  associated website and online platforms.
                </p>
              </div>

              <p className="mb-8 text-sm sm:text-base text-slate-600 leading-relaxed">
                By accessing the Website, submitting an application, or
                participating in the Event, you (&quot;you&quot; or
                &quot;Participant&quot;) acknowledge that you have read,
                understood, and agree to the terms of this Privacy Policy.
              </p>

              {/* Content */}
              <div className="space-y-7 text-sm sm:text-base text-slate-600 leading-relaxed">
                
                {/* Section Template */}
                {[
                  [
                    "1. Scope of This Privacy Policy",
                    "This Privacy Policy applies to all personal data collected from prospective participants, registered participants, mentors, judges, sponsors' representatives, speakers, and visitors of the Website in relation to the Event. It does not apply to third-party websites, services, or platforms that may be linked from or integrated with our Website."
                  ],
                ].map(() => null)}

                {/* 1 */}
                <Section
                  title="1. Scope of This Privacy Policy"
                  content="This Privacy Policy applies to all personal data collected from prospective participants, registered participants, mentors, judges, sponsors' representatives, speakers, and visitors of the Website in relation to the Event. It does not apply to third-party websites, services, or platforms that may be linked from or integrated with our Website."
                />

                {/* 2 */}
                <Section title="2. Information We Collect">
                  <p>
                    We may collect and process the following categories of personal data:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mt-3">
                    <li><strong>Identification and contact details:</strong> full name, email address, phone number, city, and country.</li>
                    <li><strong>Academic and professional details:</strong> college/institute name, department, course, year of study, organization details, designation.</li>
                    <li><strong>Team and participation details:</strong> team name, team members, track/domain, project title.</li>
                    <li><strong>Online profiles and submissions:</strong> GitHub, LinkedIn, portfolio links, repositories, presentations.</li>
                    <li><strong>Technical information:</strong> IP address, browser, device information, approximate location.</li>
                    <li><strong>Media and recordings:</strong> photographs, screenshots and video/audio recordings captured during the Event.</li>
                    <li><strong>Other information:</strong> data voluntarily provided through forms or communications.</li>
                  </ul>
                </Section>

                {/* 3 */}
                <Section title="3. How We Use Your Information">
                  <ul className="list-disc list-inside space-y-2">
                    <li>Register and manage participation.</li>
                    <li>Verify eligibility and compliance.</li>
                    <li>Communicate schedules, updates and results.</li>
                    <li>Evaluate submissions and select winners.</li>
                    <li>Issue certificates, prizes and awards.</li>
                    <li>Maintain records and event analytics.</li>
                    <li>Create promotional and reporting material.</li>
                    <li>Comply with applicable laws and policies.</li>
                  </ul>
                  <p className="mt-3">
                    We do <strong>not</strong> sell or rent personal data to third parties.
                  </p>
                </Section>

                {/* 4–12 */}
                <Section title="4. Legal Basis and Consent" content="By submitting your information and participating in the Event, you consent to the collection and use of your personal data as described in this Privacy Policy. Certain processing activities may also be necessary for event administration and legal compliance." />

                <Section title="5. Data Sharing and Disclosure" content="Personal data may be shared on a need-to-know basis with internal organizers, judges, mentors, sponsors, service providers, and legal authorities where required, under appropriate confidentiality safeguards." />

                <Section title="6. Cookies and Tracking Technologies" content="We use cookies and similar technologies for essential functionality and analytics. Disabling cookies may affect certain features of the Website." />

                <Section title="7. Data Security" content="We implement reasonable technical and organizational safeguards to protect personal data. However, no transmission or storage system can be guaranteed to be 100% secure." />

                <Section title="8. Data Retention" content="Personal data is retained only as long as necessary to fulfill event-related purposes or legal requirements, after which it is deleted or anonymized." />

                <Section title="9. Your Rights and Choices" content="Subject to applicable laws, you may request access, correction, deletion, or withdrawal of consent by contacting us." />

                <Section title="10. Children’s Privacy" content="We do not knowingly collect personal data from ineligible minors. If such data is identified, appropriate steps will be taken to remove it." />

                <Section title="11. Third-Party Websites and Services" content="We are not responsible for the privacy practices of third-party platforms linked or integrated with the Event." />

                <Section title="12. Updates to This Privacy Policy" content="This policy may be updated periodically. Continued use of the Website indicates acceptance of the updated terms." />
              </div>

              {/* Contact */}
              <div className="mt-10 border-t border-slate-200 pt-6 text-sm text-slate-600">
                <h2 className="font-semibold text-slate-900 mb-3">
                  13. Contact Us
                </h2>
                <p>Email: <strong>nexcorealliance@gmail.com</strong></p>
                <p>Organizer: <strong>Code4Bharat</strong></p>
                <p>Institution: <strong>NEXCORE ALLIANCE</strong></p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

const Section = ({ title, content, children }) => (
  <div>
    <h2 className="text-lg font-semibold text-slate-900 mb-2">{title}</h2>
    {content && <p>{content}</p>}
    {children}
    <hr className="mt-6 border-slate-200" />
  </div>
);

export default PrivacyPolicy;
