import serviceIcon from "../assets/service-icon.png"; 

export default function Services() {
  // Simulate 20 service boxes for now
  const services = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `Service ${i + 1}`,
  }));

  return (
    <section className="services-section">
      <div className="container">
        <h2 className="services-title">SERVICES</h2>

        <div className="services-wrapper">
          <div className="services-grid">
            {services.map((service) => (
              <div className="service-box" key={service.id}>
                <img src={serviceIcon} alt={service.name} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
