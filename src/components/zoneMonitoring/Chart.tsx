import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useParams, Link } from "react-router-dom";
import data from "../../data/data";

// Use same DataItem interface as TreeGrid
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

// Processed data ensures number types for charting
interface ProcessedDataItem {
  id: string;
  name: string;
  borr: number;
  savings: number;
  savingsRatio: number;
  os: number;
  avgos: number;
  otr: number;
  totalcollection: number;
  serviceCharge: number;
  savingscollection: number;
  savingsrtn: number;
  srratio: number;
  disbursement: number;
  cashandbank: number;
  overdue: number;
}

// Value column for chart configuration
interface ValueColumn {
  id: keyof ProcessedDataItem;
  name: string;
  color: string;
}

// Parse string to number for ratio fields
const parseRatio = (value: string): number => parseFloat(value) || 0;

function ChartCompo() {
  const { id } = useParams<{ id: string }>();
  const [chartData, setChartData] = useState<DataItem | null>(null);
  const [loading, setLoading] = useState(true);

  // Find item by ID
  const findItemById = (items: DataItem[], id: string): DataItem | null => {
    for (const item of items) {
      if (item.id === id) return item;
      if (item.children?.length) {
        const found = findItemById(item.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  // Fetch data
  useEffect(() => {
    if (id) {
      setLoading(true);
      const item = findItemById(data, id);
      setChartData(item);
      setLoading(false);
    }
  }, [id]);

  // Process data for charts
  const processedData: ProcessedDataItem[] = chartData
    ? chartData.children?.length
      ? chartData.children.map((item) => ({
          id: item.id,
          name: item.name,
          borr: item.borr,
          savings: item.savings,
          savingsRatio: parseRatio(item.savingsRatio),
          os: item.os,
          avgos: item.avgos,
          otr: parseRatio(item.otr),
          totalcollection: item.totalcollection,
          serviceCharge: item.serviceCharge,
          savingscollection: item.savingscollection,
          savingsrtn: item.savingsrtn,
          srratio: parseRatio(item.srratio),
          disbursement: item.disbursement,
          cashandbank: item.cashandbank,
          overdue: item.overdue,
        }))
      : [
          {
            id: chartData.id,
            name: chartData.name,
            borr: chartData.borr,
            savings: chartData.savings,
            savingsRatio: parseRatio(chartData.savingsRatio),
            os: chartData.os,
            avgos: chartData.avgos,
            otr: parseRatio(chartData.otr),
            totalcollection: chartData.totalcollection,
            serviceCharge: chartData.serviceCharge,
            savingscollection: chartData.savingscollection,
            savingsrtn: chartData.savingsrtn,
            srratio: parseRatio(chartData.srratio),
            disbursement: chartData.disbursement,
            cashandbank: chartData.cashandbank,
            overdue: chartData.overdue,
          },
        ]
    : [];

  // Single-row data for BarChart
  const singleRowData: ProcessedDataItem[] = chartData
    ? [
        {
          id: chartData.id,
          name: chartData.name,
          borr: chartData.borr,
          savings: chartData.savings,
          savingsRatio: parseRatio(chartData.savingsRatio),
          os: chartData.os,
          avgos: chartData.avgos,
          otr: parseRatio(chartData.otr),
          totalcollection: chartData.totalcollection,
          serviceCharge: chartData.serviceCharge,
          savingscollection: chartData.savingscollection,
          savingsrtn: chartData.savingsrtn,
          srratio: parseRatio(chartData.srratio),
          disbursement: chartData.disbursement,
          cashandbank: chartData.cashandbank,
          overdue: chartData.overdue,
        },
      ]
    : [];

  // Chart columns
  const valueColumns: ValueColumn[] = [
    { id: "savings", name: "Savings", color: "#82ca9d" },
    { id: "totalcollection", name: "Total Collection", color: "#8884d8" },
    { id: "os", name: "OS", color: "#2E8B57" },
    { id: "avgos", name: "AvgOS", color: "#00ffff" },
    { id: "serviceCharge", name: "Service Charge", color: "#ffc658" },
    { id: "savingscollection", name: "Savings Collection", color: "#ff7300" },
    { id: "savingsrtn", name: "Savings Return", color: "#6495ed" },
    { id: "disbursement", name: "Disbursement", color: "#38A3A5" },
    { id: "cashandbank", name: "Cash&Bank", color: "#00ff00" },
    { id: "overdue", name: "Overdue", color: "#ff0000" },
    { id: "savingsRatio", name: "Savings Ratio", color: "#ff00ff" },
    { id: "otr", name: "OTR", color: "#ff7f50" },
    { id: "srratio", name: "SR Ratio", color: "#dc143c" },
  ];

  // Common chart props
  const commonProps = {
    data: processedData,
    margin: { top: 20, right: 30, left: 20, bottom: 60 },
  };

  if (loading) {
    return <div className="p-4 text-xl">Loading...</div>;
  }

  if (!chartData) {
    return <div className="p-4 text-xl">No data found</div>;
  }

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Bar Chart */}
      <div
        className="p-4 m-2 rounded-lg shadow-md bg-white"
        style={{ width: "99%", height: "100vh" }}
      >
        <div className="flex items-center justify-between">
          <h2 className="xl:text-3xl lg:text-2xl font-bold mb-4">
            Bar Chart for {chartData.name}
          </h2>
          <Link
            to="/dashboard"
            className="hover:text-green-600 transition-transform transform active:scale-95"
          >
            Go To Dashboard
          </Link>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={singleRowData}
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={0} textAnchor="middle" height={70} />
            <YAxis />
            <Tooltip
              formatter={(value: number, name: string) =>
                ["savingsRatio", "otr", "srratio"].includes(name)
                  ? `${value}%`
                  : value
              }
            />
            <Legend verticalAlign="top" height={36} />
            {valueColumns.map((column) => (
              <Bar
                key={column.id}
                dataKey={column.id}
                name={column.name}
                fill={column.color}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Area Chart */}
      <div
        className="p-4 bg-white min-h-screen shadow-md rounded-lg"
        style={{ width: "100%", height: "99vh" }}
      >
        <div className="flex items-center justify-between">
          <h1 className="lg:text-3xl md:text-2xl font-bold mb-4">
            Area Chart of {chartData.name}
          </h1>
          <Link to="/dashboard" className="hover:text-green-600">
            Go To Dashboard
          </Link>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              formatter={(value: number, name: string) =>
                ["savingsRatio", "otr", "srratio"].includes(name)
                  ? `${value}%`
                  : value
              }
            />
            <Legend />
            {valueColumns.map((column) => (
              <Area
                type="monotone"
                key={column.id}
                dataKey={column.id}
                name={column.name}
                stroke={column.color}
                fill={column.color}
                fillOpacity={0.4}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart */}
      <div
        className="p-4 bg-white shadow-md rounded-lg"
        style={{ width: "100%", height: "99vh" }}
      >
        <div className="flex items-center justify-between">
          <h1 className="lg:text-3xl md:text-2xl font-bold mb-4">
            Line Chart of {chartData.name}
          </h1>
          <Link to="/dashboard" className="hover:text-green-600">
            Go To Dashboard
          </Link>
        </div>
        <ResponsiveContainer width="100%" height="90%">
          <LineChart {...commonProps}>
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              formatter={(value: number, name: string) =>
                ["savingsRatio", "otr", "srratio"].includes(name)
                  ? `${value}%`
                  : value
              }
            />
            <Legend />
            {valueColumns.map((column) => (
              <Line
                type="monotone"
                key={column.id}
                dataKey={column.id}
                name={column.name}
                stroke={column.color}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div
        className="p-4 bg-white shadow-md rounded-lg"
        style={{ width: "100%", height: "99vh" }}
      >
        <div className="flex items-center justify-between">
          <h1 className="lg:text-3xl md:text-2xl font-bold mb-4">
            Pie Chart of {chartData.name}
          </h1>
          <Link to="/dashboard" className="hover:text-green-600">
            Go To Dashboard
          </Link>
        </div>
        <ResponsiveContainer width="100%" height="80%">
          <PieChart>
            <Pie
              data={processedData}
              cx="50%"
              cy="50%"
              outerRadius={200}
              dataKey="savings"
              nameKey="name"
              label={({ name, value }: { name: string; value: number }) =>
                `${name}: ${value}`
              }
            >
              {processedData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={valueColumns[index % valueColumns.length].color}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ChartCompo;
