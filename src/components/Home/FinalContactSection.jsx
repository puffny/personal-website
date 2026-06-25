import { siteData } from "../../data/siteData";
import TextPressure from "../shared/TextPressure";

export default function FinalContactSection() {
  const { contact } = siteData;
  const contactItems = [
    contact.email,
    contact.phone,
    contact.location,
    contact.website,
  ];

  return (
    <section className="content-shell final-contact-section" id="contact">
      <div className="content-main final-contact">
        <h2 className="final-thanks" aria-label="THANKS.">
          <TextPressure
            text="THANKS."
            flex
            alpha={false}
            stroke={false}
            width
            weight
            italic
            textColor="#fff"
            minFontSize={96}
          />
        </h2>
        <address
          className="final-contact-list"
          aria-label="Contact information"
        >
          {contactItems.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </address>
      </div>
    </section>
  );
}
