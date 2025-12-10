import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Terms() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1">
        <section className="px-4 sm:px-6 lg:px-8 pt-28 pb-16">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white border border-slate-200 shadow-sm rounded-2xl px-6 py-8 sm:px-10 sm:py-10 md:px-12 md:py-12">
              {/* Header */}
              <div className="mb-8 border-b border-slate-200 pb-6">
                <p className="text-xs font-medium tracking-[0.16em] text-slate-500 uppercase mb-2">
                  Legal & Compliance
                </p>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">
                  Terms &amp; Conditions
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Last updated: <span className="font-medium">January 2026</span>
                </p>
                <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                  By registering and participating in{" "}
                  <span className="font-semibold text-slate-800">
                    CODE4BHARAT 2026
                  </span>
                  , you agree to the following terms and conditions. Please review
                  them carefully before submitting your registration.
                </p>
              </div>

              {/* Body */}
              <div className="space-y-6 text-sm sm:text-base text-slate-600 leading-relaxed">
                {/* 1 */}
                <div className="grid sm:grid-cols-[0.35fr,1fr] gap-3 sm:gap-6">
                  <h3 className="font-semibold text-slate-900">
                    1. Eligibility
                  </h3>
                  <p>
                    Participants must be currently enrolled students or early
                    career professionals. This is a solo hackathon—only one person
                    can work on and submit each project. The organisers reserve
                    the right to verify identity and eligibility at any stage.
                  </p>
                </div>

                {/* Divider */}
                <hr className="border-slate-200" />

                {/* 2 */}
                <div className="grid sm:grid-cols-[0.35fr,1fr] gap-3 sm:gap-6">
                  <h3 className="font-semibold text-slate-900">
                    2. Registration Details
                  </h3>
                  <p>
                    All information provided during registration must be accurate
                    and complete. Providing false, incomplete, or misleading
                    details may result in rejection of your registration or
                    disqualification from the event.
                  </p>
                </div>

                <hr className="border-slate-200" />

                {/* 3 */}
                <div className="grid sm:grid-cols-[0.35fr,1fr] gap-3 sm:gap-6">
                  <h3 className="font-semibold text-slate-900">
                    3. Original Work
                  </h3>
                  <p>
                    Your project must be created during the 6-hour hackathon
                    window. You may use publicly available libraries and
                    frameworks, but copying entire projects or code without proper
                    attribution is strictly prohibited.
                  </p>
                </div>

                <hr className="border-slate-200" />

                {/* 4 */}
                <div className="grid sm:grid-cols-[0.35fr,1fr] gap-3 sm:gap-6">
                  <h3 className="font-semibold text-slate-900">
                    4. Intellectual Property
                  </h3>
                  <p>
                    Unless explicitly stated otherwise, the intellectual property
                    of the project remains with the participant. However, the
                    organisers may showcase your project (with credit) for
                    promotional, educational, or marketing purposes related to the
                    event.
                  </p>
                </div>

                <hr className="border-slate-200" />

                {/* 5 */}
                <div className="grid sm:grid-cols-[0.35fr,1fr] gap-3 sm:gap-6">
                  <h3 className="font-semibold text-slate-900">
                    5. Code of Conduct
                  </h3>
                  <p>
                    All participants are expected to maintain respectful and
                    professional behaviour. Any form of harassment, abuse, or
                    discriminatory conduct will not be tolerated and may lead to
                    immediate removal from the hackathon.
                  </p>
                </div>

                <hr className="border-slate-200" />

                {/* 6 */}
                <div className="grid sm:grid-cols-[0.35fr,1fr] gap-3 sm:gap-6">
                  <h3 className="font-semibold text-slate-900">
                    6. Prizes &amp; Rewards
                  </h3>
                  <p>
                    Prizes will be in the form of gifts and hampers. The exact
                    nature of the first prize is a surprise and may be updated or
                    modified by the organisers if required. Prizes are
                    non-transferable and cannot be exchanged for cash.
                  </p>
                </div>

                <hr className="border-slate-200" />

                {/* 7 */}
                <div className="grid sm:grid-cols-[0.35fr,1fr] gap-3 sm:gap-6">
                  <h3 className="font-semibold text-slate-900">
                    7. Certificates
                  </h3>
                  <p>
                    Certificates of participation will be awarded to the top 20
                    participants based on the final evaluation. The organisers
                    reserve the right to decide the final list of certificate
                    recipients.
                  </p>
                </div>

                <hr className="border-slate-200" />

                {/* 8 */}
                <div className="grid sm:grid-cols-[0.35fr,1fr] gap-3 sm:gap-6">
                  <h3 className="font-semibold text-slate-900">
                    8. Evaluation &amp; Jury Decision
                  </h3>
                  <p>
                    All submissions will be evaluated by a designated jury panel.
                    The decision of the jury will be final and binding. Requests
                    for re-evaluation or contesting the results will not be
                    entertained.
                  </p>
                </div>

                <hr className="border-slate-200" />

                {/* 9 */}
                <div className="grid sm:grid-cols-[0.35fr,1fr] gap-3 sm:gap-6">
                  <h3 className="font-semibold text-slate-900">
                    9. Data &amp; Privacy
                  </h3>
                  <p>
                    Registration details will be used only for communication,
                    coordination, and event analytics. Personal data will not be
                    sold to third parties. By registering, you consent to receive
                    event-related communications via email and other channels.
                  </p>
                </div>

                <hr className="border-slate-200" />

                {/* 10 */}
                <div className="grid sm:grid-cols-[0.35fr,1fr] gap-3 sm:gap-6">
                  <h3 className="font-semibold text-slate-900">
                    10. Changes &amp; Cancellation
                  </h3>
                  <p>
                    The organisers may modify the schedule, structure, prizes, or
                    terms of the event, or cancel the hackathon if required due to
                    unavoidable circumstances. Any major updates will be
                    communicated to registered participants through official
                    channels.
                  </p>
                </div>
              </div>

              {/* Footer text */}
              <p className="mt-8 text-xs sm:text-sm text-slate-500 leading-relaxed border-t border-slate-200 pt-4">
                By continuing with registration and participation, you confirm that
                you have read, understood, and agreed to these Terms &amp;
                Conditions.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Terms;
