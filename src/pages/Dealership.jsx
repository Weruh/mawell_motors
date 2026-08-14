import { useData } from "../context/DataContext";

function Dealership() {
  const { product } = useData();

  const containerStyle = {
    minHeight: "100vh",
    backgroundColor: "#f1f5f9",
    padding: "32px 16px",
    fontFamily: "system-ui, -apple-system, sans-serif",
  };

  const headerStyle = {
    fontSize: "2.25rem",
    fontWeight: "700",
    color: "#0284c7",
    marginBottom: "32px",
    textAlign: "center",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "24px",
    maxWidth: "1150px",
    margin: "0 auto",
  };

  const cardStyle = {
    backgroundColor: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "12px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  };

  const imageStyle = {
    width: "100%",
    height: "192px",
    objectFit: "cover",
    backgroundColor: "#e2e8f0",
  };

  const cardBodyStyle = {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "space-between",
  };

  const titleStyle = {
    fontSize: "1.25rem",
    fontWeight: "600",
    color: "#334155",
    margin: "0 0 8px 0",
  };

  const descriptionStyle = {
    fontSize: "0.875rem",
    color: "#64748b",
    margin: "0 0 16px 0",
    lineHeight: "1.5",
  };

  const footerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "auto",
  };

  const priceLabelStyle = {
    color: "black",
    fontWeight: "700",
    fontSize: "1.125rem",
    margin: 0,
  };

  const priceStyle = {
    color: "#0284c7",
    fontWeight: "600",
    fontSize: "1.125rem",
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Our Dealership</h1>

      <div style={gridStyle}>
        {product.map((car) => (
          <div key={car.id} style={cardStyle}>
            <img
              src={car.image}
              alt={car.name}
              style={imageStyle}
            />

            <div style={cardBodyStyle}>
              <div>
                <h2 style={titleStyle}>{car.name}</h2>

                <p style={descriptionStyle}>
                  {car.description}
                </p>
              </div>

              <div style={footerStyle}>
                <h3 style={priceLabelStyle}>
                  Asking price:
                  <span style={priceStyle}> {car.price}</span>
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dealership;