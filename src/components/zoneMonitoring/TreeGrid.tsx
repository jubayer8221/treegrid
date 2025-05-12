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
            backgroundColor: "#ffffff",
            transition: "background-color 0.2s ease",
            cursor: "pointer",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#f1f5f9")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#ffffff")
          }
        >
          <td
            style={{
              padding: "0.75rem 1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              fontWeight: "500",
              color: "#1f2937",
              fontSize: "0.875rem",
              paddingLeft: `${1.5 + level * 1.5}rem`, // Indent based on level
            }}
          >
            {item.children && item.children.length > 0 ? (
              <button
                onClick={() => toggleOpen(item.id)}
                style={{
                  width: "1.5rem",
                  height: "1.5rem",
                  backgroundColor: "#4b5563",
                  color: "#ffffff",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "none",
                  transition: "background-color 0.2s ease, transform 0.2s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#6b7280")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#4b5563")
                }
                onMouseDown={(e) =>
                  (e.currentTarget.style.transform = "scale(0.95)")
                }
                onMouseUp={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <img
                  src={
                    isOpen
                      ? "/images/svgs/arrow-top.svg"
                      : "/images/svgs/arrow-down.svg"
                  }
                  alt={isOpen ? "arrow-up" : "arrow-down"}
                  width={12}
                  height={12}
                  style={{ filter: "invert(100%)" }}
                />
              </button>
            ) : (
              <div style={{ width: "1.5rem", height: "1.5rem" }} /> // Placeholder for alignment
            )}
            <span style={{ flex: 1 }}>{item.name}</span>
          </td>
          <td
            style={{
              padding: "0.75rem 1.5rem",
              fontSize: "0.875rem",
              color: "#374151",
              textAlign: "right",
            }}
          >
            {item.borr.toLocaleString()}
          </td>
          <td
            style={{
              padding: "0.75rem 1.5rem",
              fontSize: "0.875rem",
              color: "#374151",
              textAlign: "right",
            }}
          >
            {item.savings.toLocaleString()}
          </td>
          <td
            style={{
              padding: "0.75rem 1.5rem",
              fontSize: "0.875rem",
              color: "#374151",
              textAlign: "right",
            }}
          >
            {item.savingsRatio}
          </td>
          <td
            style={{
              padding: "0.75rem 1.5rem",
              fontSize: "0.875rem",
              color: "#374151",
              textAlign: "right",
            }}
          >
            {item.os.toLocaleString()}
          </td>
          <td
            style={{
              padding: "0.75rem 1.5rem",
              fontSize: "0.875rem",
              color: "#374151",
              textAlign: "right",
            }}
          >
            {item.avgos.toFixed(3)}
          </td>
          <td
            style={{
              padding: "0.75rem 1.5rem",
              fontSize: "0.875rem",
              color: "#374151",
              textAlign: "right",
            }}
          >
            {item.otr}
          </td>
          <td
            style={{
              padding: "0.75rem 1.5rem",
              fontSize: "0.875rem",
              color: "#374151",
              textAlign: "right",
            }}
          >
            {item.totalcollection.toLocaleString()}
          </td>
          <td
            style={{
              padding: "0.75rem 1.5rem",
              fontSize: "0.875rem",
              color: "#374151",
              textAlign: "right",
            }}
          >
            {item.serviceCharge.toLocaleString()}
          </td>
          <td
            style={{
              padding: "0.75rem 1.5rem",
              fontSize: "0.875rem",
              color: "#374151",
              textAlign: "right",
            }}
          >
            {item.savingscollection.toLocaleString()}
          </td>
          <td
            style={{
              padding: "0.75rem 1.5rem",
              fontSize: "0.875rem",
              color: "#374151",
              textAlign: "right",
            }}
          >
            {item.srratio}
          </td>
          <td
            style={{
              padding: "0.75rem 1.5rem",
              fontSize: "0.875rem",
              color: "#374151",
              textAlign: "right",
            }}
          >
            {item.disbursement.toLocaleString()}
          </td>
          <td
            style={{
              padding: "0.75rem 1.5rem",
              fontSize: "0.875rem",
              color: "#374151",
              textAlign: "right",
            }}
          >
            {item.cashandbank.toLocaleString()}
          </td>
          <td
            style={{
              padding: "0.75rem 1.5rem",
              fontSize: "0.875rem",
              color: "#374151",
              textAlign: "right",
            }}
          >
            {item.overdue.toLocaleString()}
          </td>
          <td
            style={{
              padding: "0.75rem 1.5rem",
              textAlign: "center",
            }}
          >
            <Link to={`/components/zoneMonitoring/chart/${item.id}`}>
              <button
                style={{
                  width: "1.5rem",
                  height: "1.5rem",
                  backgroundColor: "#10b981",
                  color: "#ffffff",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "none",
                  transition: "background-color 0.2s ease, transform 0.2s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#059669")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#10b981")
                }
                onMouseDown={(e) =>
                  (e.currentTarget.style.transform = "scale(0.95)")
                }
                onMouseUp={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <img
                  src="/images/svgs/eye.svg"
                  alt="eye-icon"
                  width={12}
                  height={12}
                  style={{ filter: "invert(100%)" }}
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
    <div
      style={{
        padding: "1rem",
        backgroundColor: "#f9fafb",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          fontSize: "1.875rem",
          fontWeight: "700",
          color: "#1f2937",
          marginBottom: "1.5rem",
          textAlign: "left",
        }}
      >
        Financial Dashboard
      </h1>
      <div
        style={{
          overflowX: "auto",
          backgroundColor: "#ffffff",
          boxShadow:
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          borderRadius: "0.5rem",
          border: "1px solid #e5e7eb",
        }}
      >
        <table
          style={{
            minWidth: "99%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: "#1f2937",
                color: "#ffffff",
                textAlign: "left",
                fontSize: "0.875rem",
                fontWeight: "600",
                textTransform: "uppercase",
              }}
            >
              <th
                style={{
                  padding: "1rem",
                  position: "sticky",
                  top: 0,
                  backgroundColor: "#1f2937",
                  zIndex: 5,
                }}
              >
                Operation Place
              </th>
              <th
                style={{
                  padding: "1rem 1.5rem",
                  textAlign: "right",
                  position: "sticky",
                  top: 0,
                  backgroundColor: "#1f2937",
                  zIndex: 5,
                }}
              >
                Borr / Br
              </th>
              <th
                style={{
                  padding: "1rem 1.5rem",
                  textAlign: "right",
                  position: "sticky",
                  top: 0,
                  backgroundColor: "#1f2937",
                  zIndex: 5,
                }}
              >
                Savings
              </th>
              <th
                style={{
                  padding: "1rem 1.5rem",
                  textAlign: "right",
                  position: "sticky",
                  top: 0,
                  backgroundColor: "#1f2937",
                  zIndex: 10,
                }}
              >
                Savings Ratio
              </th>
              <th
                style={{
                  padding: "1rem 1.5rem",
                  textAlign: "right",
                  position: "sticky",
                  top: 0,
                  backgroundColor: "#1f2937",
                  zIndex: 10,
                }}
              >
                OS
              </th>
              <th
                style={{
                  padding: "1rem 1.5rem",
                  textAlign: "right",
                  position: "sticky",
                  top: 0,
                  backgroundColor: "#1f2937",
                  zIndex: 10,
                }}
              >
                Avg. OS
              </th>
              <th
                style={{
                  padding: "1rem 1.5rem",
                  textAlign: "right",
                  position: "sticky",
                  top: 0,
                  backgroundColor: "#1f2937",
                  zIndex: 10,
                }}
              >
                OTR%
              </th>
              <th
                style={{
                  padding: "1rem 1.5rem",
                  textAlign: "right",
                  position: "sticky",
                  top: 0,
                  backgroundColor: "#1f2937",
                  zIndex: 10,
                }}
              >
                Total Collection
              </th>
              <th
                style={{
                  padding: "1rem 1.5rem",
                  textAlign: "right",
                  position: "sticky",
                  top: 0,
                  backgroundColor: "#1f2937",
                  zIndex: 10,
                }}
              >
                Service Charge
              </th>
              <th
                style={{
                  padding: "1rem 1.5rem",
                  textAlign: "right",
                  position: "sticky",
                  top: 0,
                  backgroundColor: "#1f2937",
                  zIndex: 10,
                }}
              >
                Savings RTN
              </th>
              <th
                style={{
                  padding: "1rem 1.5rem",
                  textAlign: "right",
                  position: "sticky",
                  top: 0,
                  backgroundColor: "#1f2937",
                  zIndex: 10,
                }}
              >
                SR Ratio
              </th>
              <th
                style={{
                  padding: "1rem 1.5rem",
                  textAlign: "right",
                  position: "sticky",
                  top: 0,
                  backgroundColor: "#1f2937",
                  zIndex: 10,
                }}
              >
                Disbursement
              </th>
              <th
                style={{
                  padding: "1rem 1.5rem",
                  textAlign: "right",
                  position: "sticky",
                  top: 0,
                  backgroundColor: "#1f2937",
                  zIndex: 10,
                }}
              >
                Cash & Bank
              </th>
              <th
                style={{
                  padding: "1rem 1.5rem",
                  textAlign: "right",
                  position: "sticky",
                  top: 0,
                  backgroundColor: "#1f2937",
                  zIndex: 10,
                }}
              >
                Overdue
              </th>
              <th
                style={{
                  padding: "1rem 1.5rem",
                  textAlign: "center",
                  position: "sticky",
                  top: 0,
                  backgroundColor: "#1f2937",
                  zIndex: 10,
                }}
              >
                View
              </th>
            </tr>
          </thead>
          <tbody
            style={{
              color: "#374151",
              fontSize: "0.875rem",
            }}
          >
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
