import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

function Terms() {
  return (
    <div >
      <Navbar/>
    <div>
      <section className="sm:px-6 pt-18 lg:px-8 mb-16"
      >
        
        <div className="max-w-5xl  mx-auto">
          <div className="card-soft p-8 sm:p-10 md:p-12">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
              Terms &amp; Conditions
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mb-6">
              By registering and participating in CODE4BHARAT 2026, you agree to
              the following terms and conditions. Please read them carefully
              before submitting your registration.
            </p>

            <div className="space-y-4 text-sm text-slate-600">
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">
                  1. Eligibility
                </h3>
                <p>
                  Participants must be currently enrolled students or early
                  career professionals. This is a solo hackathon—only one person
                  can work on and submit each project. The organisers reserve
                  the right to verify identity and eligibility at any stage.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 mb-1">
                  2. Registration Details
                </h3>
                <p>
                  All information provided during registration must be accurate
                  and complete. Providing false, incomplete, or misleading
                  details may result in rejection of your registration or
                  disqualification from the event.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 mb-1">
                  3. Original Work
                </h3>
                <p>
                  Your project must be created during the 6-hour hackathon
                  window. You may use publicly available libraries and
                  frameworks, but copying entire projects or code without proper
                  attribution is strictly prohibited.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 mb-1">
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

              <div>
                <h3 className="font-semibold text-slate-900 mb-1">
                  5. Code of Conduct
                </h3>
                <p>
                  All participants are expected to maintain respectful and
                  professional behaviour. Any form of harassment, abuse, or
                  discriminatory conduct will not be tolerated and may lead to
                  immediate removal from the hackathon.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 mb-1">
                  6. Prizes &amp; Rewards
                </h3>
                <p>
                  Prizes will be in the form of gifts and hampers. The exact
                  nature of the first prize is a surprise and may be updated or
                  modified by the organisers if required. Prizes are
                  non-transferable and cannot be exchanged for cash.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 mb-1">
                  7. Certificates
                </h3>
                <p>
                  Certificates of participation will be awarded to the top 20
                  participants based on the final evaluation. The organisers
                  reserve the right to decide the final list of certificate
                  recipients.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 mb-1">
                  8. Evaluation &amp; Jury Decision
                </h3>
                <p>
                  All submissions will be evaluated by a designated jury panel.
                  The decision of the jury will be final and binding. Requests
                  for re-evaluation or contesting the results will not be
                  entertained.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 mb-1">
                  9. Data &amp; Privacy
                </h3>
                <p>
                  Registration details will be used only for communication,
                  coordination, and event analytics. Personal data will not be
                  sold to third parties. By registering, you consent to receive
                  event-related communications via email and other channels.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 mb-1">
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

            <p className="mt-6 text-xs text-slate-500">
              By continuing with registration and participation, you confirm
              that you have read, understood, and agreed to these Terms &amp;
              Conditions.
            </p>
          </div>
        </div>
      </section></div>
      <Footer/>
      </div>
  )
}

export default Terms