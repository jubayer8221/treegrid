import { useState } from "react";
import { Link } from "react-router-dom";
import data from "../../data/data";

// Define the shape of each data item
interface DataItem {
  id: string;
  name: string;
  borr: number;
  savings: number;
  savingsRatio: string;
  os: number;
  avgos: number;
  otr: string;
  totalcollection: number;
  serviceCharge: number;
  savingscollection: number;
  savingsrtn: number;
  srratio: string;
  disbursement: number;
  cashandbank: number;
  overdue: number;
  isOpen?: boolean;
  children?: DataItem[];
}

const TreeGrid = () => {
  const [isOpenRow, setIsOpenRow] = useState<{ [key: string]: boolean }>({});

  const toggleOpen = (id: string) => {
    setIsOpenRow((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const Randrow: React.FC<{ item: DataItem; level?: number }> = ({
    item,
    level = 0,
  }) => {
    const isOpen = isOpenRow[item.id] || false;
    return (
      <>
        <tr
          style={{
            borderBottom: "1px solid #e5e7eb",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#f9fafb")
          }
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}
        >
          <td
            style={{
              padding: "0.5rem 1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              ...(level ? { paddingLeft: "1.5rem" } : {}),
            }}
          >
            {item.children && item.children.length > 0 ? (
              <button
                onClick={() => toggleOpen(item.id)}
                style={{
                  width: "1.25rem",
                  height: "1.25rem",
                  backgroundColor: "#6b7280",
                  color: "#ffffff",
                  borderRadius: "9999px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {isOpen ? (
                  <img
                    src="/images/svgs/arrow-top.svg"
                    alt="arrow-up"
                    width={10}
                    height={10}
                  />
                ) : (
                  <img
                    src="/images/svgs/arrow-down.svg"
                    alt="arrow-down"
                    width={10}
                    height={10}
                  />
                )}
              </button>
            ) : (
              <img
                src="/images/svgs/arrow-top.svg"
                alt="arrow-up"
                width={10}
                height={10}
              />
            )}
            <span>{item.name}</span>
          </td>
          <td style={{ padding: "0.5rem 1rem" }}>{item.borr}</td>
          <td style={{ padding: "0.5rem 1rem" }}>{item.savings}</td>
          <td style={{ padding: "0.5rem 1rem" }}>{item.savingsRatio}</td>
          <td style={{ padding: "0.5rem 1rem" }}>{item.os}</td>
          <td style={{ padding: "0.5rem 1rem" }}>{item.avgos}</td>
          <td style={{ padding: "0.5rem 1rem" }}>{item.otr}</td>
          <td style={{ padding: "0.5rem 1rem" }}>{item.totalcollection}</td>
          <td style={{ padding: "0.5rem 1rem" }}>{item.serviceCharge}</td>
          <td style={{ padding: "0.5rem 1rem" }}>{item.savingscollection}</td>
          <td style={{ padding: "0.5rem 1rem" }}>{item.srratio}</td>
          <td style={{ padding: "0.5rem 1rem" }}>{item.disbursement}</td>
          <td style={{ padding: "0.5rem 1rem" }}>{item.cashandbank}</td>
          <td style={{ padding: "0.5rem 1rem" }}>{item.overdue}</td>
          <td style={{ padding: "0.5rem 1rem" }}>
            <Link to={`/components/zoneMonitoring/chart/${item.id}`}>
              <button
                style={{
                  width: "1.25rem",
                  height: "1.25rem",
                  backgroundColor: "#6b7280",
                  color: "#ffffff",
                  borderRadius: "9999px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src="/images/svgs/eye.svg"
                  alt="eye-icon"
                  width={10}
                  height={10}
                />
              </button>
            </Link>
          </td>
        </tr>
        {isOpen &&
          item.children &&
          item.children.map((child) => (
            <Randrow item={child} key={child.id} level={level + 1} />
          ))}
      </>
    );
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1
        style={{
          fontSize: "1.5rem",
          fontWeight: "700",
          marginBottom: "1rem",
        }}
      >
        Financial Dashboard
      </h1>
      <div
        style={{
          overflowX: "auto",
          backgroundColor: "#ffffff",
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          borderRadius: "0.375rem",
        }}
      >
        <table style={{ minWidth: "100%" }}>
          <thead>
            <tr
              style={{
                backgroundColor: "#f3f4f6",
                color: "#4b5563",
                textAlign: "left",
                fontSize: "0.875rem",
              }}
            >
              <th style={{ padding: "0.5rem 1rem" }}>Operation Place</th>
              <th style={{ padding: "0.5rem 1rem" }}>Borr / Br</th>
              <th style={{ padding: "0.5rem 1rem" }}>Savings</th>
              <th style={{ padding: "0.5rem 1rem" }}>Savings Ratio</th>
              <th style={{ padding: "0.5rem 1rem" }}>OS</th>
              <th style={{ padding: "0.5rem 1rem" }}>Avg. OS</th>
              <th style={{ padding: "0.5rem 1rem" }}>OTR%</th>
              <th style={{ padding: "0.5rem 1rem" }}>Total Collection</th>
              <th style={{ padding: "0.5rem 1rem" }}>Service Charge</th>
              <th style={{ padding: "0.5rem 1rem" }}>Savings RTN</th>
              <th style={{ padding: "0.5rem 1rem" }}>SR Ratio</th>
              <th style={{ padding: "0.5rem 1rem" }}>Disbursement</th>
              <th style={{ padding: "0.5rem 1rem" }}>Cash & Bank</th>
              <th style={{ padding: "0.5rem 1rem" }}>Overdue</th>
              <th style={{ padding: "0.5rem 1rem" }}>View</th>
            </tr>
          </thead>
          <tbody style={{ color: "#4b5563", fontSize: "0.875rem" }}>
            {data.map((item: DataItem) => (
              <Randrow key={item.id} item={item} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TreeGrid;
