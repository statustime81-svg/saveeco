import "./CertificationMarquee.css";

type Certification = {
  mark: string;
  name: string;
  detail: string;
  style: string;
};

const certifications: Certification[] = [
  { mark: "USDA", name: "Organic", detail: "USDA Organic", style: "usda" },
  { mark: "USOCA", name: "Organic Certification", detail: "NPOP / NAB", style: "usoca" },
  { mark: "FDA", name: "Registration", detail: "FDA", style: "fda" },
  { mark: "FSSAI", name: "Food Safety", detail: "FSSAI", style: "fssai" },
];

function CertificationSet({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div className="certification-marquee__set" aria-hidden={duplicate || undefined}>
      {certifications.map((item) => (
        <div className="certification-marquee__item" key={`${duplicate ? "copy-" : ""}${item.style}`}>
          <div className={`certification-marquee__mark certification-marquee__mark--${item.style}`}>
            <span>{item.mark}</span>
            {item.style === "usda" && <small>ORGANIC</small>}
          </div>
          <div className="certification-marquee__copy">
            <strong>{item.name}</strong>
            <span>{item.detail}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function CertificationMarquee() {
  return (
    <section className="certification-marquee" aria-labelledby="certification-marquee-title">
      <div className="certification-marquee__heading">
        <span aria-hidden="true" />
        <h2 id="certification-marquee-title">Certifications &amp; Registrations</h2>
        <span aria-hidden="true" />
      </div>

      <div className="certification-marquee__viewport">
        <div className="certification-marquee__track">
          <CertificationSet />
          <CertificationSet duplicate />
        </div>
      </div>
    </section>
  );
}
