"use client";

import React, { useState } from "react";
import Link from "next/link";
import ConsultationModal from "./ConsultationModal";

export default function ConsultationCTA() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="mx-auto max-w-3xl px-6 py-24 text-center lg:py-32 bg-[#F9F8F3] text-[#1C1B18]">
        <p className="eyebrow-ink">Begin</p>
        <h2 className="display-2 mt-5">Tell us about the residence.</h2>
        <p className="lede mt-6">
          Share the home, the timeline and how you want to live in it. We will come back with a clear view of scope, sequence and cost.
        </p>
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="btn-ink cursor-pointer"
          >
            Request a consultation
          </button>
        </div>
      </section>

      {/* Interactive Modal */}
      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}

