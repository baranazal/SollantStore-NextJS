'use client'

export default function TermsContent() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Terms & Conditions</h1>
      <div className="prose max-w-none">
        <h2>1. Introduction</h2>
        <p>
          These Website Standard Terms and Conditions written on this webpage shall manage your use of our website.
          These Terms will be applied fully and affect your use of this Website.
        </p>

        <h2>2. Intellectual Property Rights</h2>
        <p>
          Other than the content you own, under these Terms, our Company and/or its licensors own all the intellectual property rights
          and materials contained in this Website.
        </p>

        <h2>3. Restrictions</h2>
        <p>
          You are specifically restricted from all of the following:
        </p>
        <ul>
          <li>Publishing any Website material in any other media</li>
          <li>Selling, sublicensing and/or otherwise commercializing any Website material</li>
          <li>Publicly performing and/or showing any Website material</li>
          <li>Using this Website in any way that is or may be damaging to this Website</li>
          <li>Using this Website in any way that impacts user access to this Website</li>
        </ul>

        {/* Add more sections as needed */}
      </div>
    </div>
  )
}