import React from "react"
import AdminSidebar from "@/components/layout/sidebars/AdminSidebar"
import { ResponsiveLine } from "@nivo/line"
import { ResponsivePie } from "@nivo/pie"
import { ResponsiveBar } from "@nivo/bar"
import styles from "./admin.module.css"

const dataLine = [
  {
    id: "Desktop",
    data: [
      { x: "Jan", y: 43 },
      { x: "Feb", y: 137 },
      { x: "Mar", y: 61 },
      { x: "Apr", y: 145 },
      { x: "May", y: 26 },
      { x: "Jun", y: 154 }
    ]
  },
  {
    id: "Mobile",
    data: [
      { x: "Jan", y: 60 },
      { x: "Feb", y: 48 },
      { x: "Mar", y: 177 },
      { x: "Apr", y: 78 },
      { x: "May", y: 96 },
      { x: "Jun", y: 204 }
    ]
  }
]

const dataPie = [
  { id: "Jan", value: 111 },
  { id: "Feb", value: 157 },
  { id: "Mar", value: 129 },
  { id: "Apr", value: 150 },
  { id: "May", value: 119 },
  { id: "Jun", value: 72 }
]

const dataBar = [
  { name: "Jan", count: 111 },
  { name: "Feb", count: 157 },
  { name: "Mar", count: 129 },
  { name: "Apr", count: 150 },
  { name: "May", count: 119 },
  { name: "Jun", count: 72 }
]

export const AdminDashboard = () => {
  return (
    <div className={styles.dashboardContainer}>
      <AdminSidebar />
      <div className={styles.mainContent}>
        <div className={styles.statsContainer}>
          <div className={styles.stat}>
            <h2>Total Users</h2>
            <p>34</p>
          </div>
          <div className={styles.stat}>
            <h2>Active Users</h2>
            <p>5</p>
          </div>
          <div className={styles.stat}>
            <h2>New Signups</h2>
            <p>4</p>
          </div>
          <div className={styles.stat}>
            <h2>Revenue</h2>
            <p>$5000</p>
          </div>
        </div>
        <div className={styles.chartContainer}>
          <div className={styles.chart}>
            <h2>User Growth</h2>
            <ResponsiveLine
              data={dataLine}
              margin={{ top: 20, right: 20, bottom: 50, left: 50 }}
              xScale={{ type: "point" }}
              yScale={{ type: "linear" }}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Month",
                legendOffset: 36,
                legendPosition: "middle"
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Users",
                legendOffset: -40,
                legendPosition: "middle"
              }}
              colors={["#2563eb", "#e11d48"]}
              pointSize={10}
              pointBorderWidth={2}
              pointLabelYOffset={-12}
              useMesh={true}
              theme={{
                tooltip: {
                  container: {
                    background: "#333",
                    color: "#fff",
                    fontSize: "12px",
                    borderRadius: "2px",
                    boxShadow: "0 3px 9px rgba(0, 0, 0, 0.5)"
                  }
                }
              }}
            />
          </div>
          <div className={styles.chart}>
            <h2>Revenue Breakdown</h2>
            <ResponsivePie
              data={dataPie}
              margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
              innerRadius={0.5}
              padAngle={0.7}
              cornerRadius={3}
              colors={{ scheme: "nivo" }}
              borderWidth={1}
              borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
              arcLabelsSkipAngle={10}
              arcLabelsTextColor="#333333"
              arcLinkLabelsColor={{ from: "color" }}
              arcLinkLabelsTextColor="#333333"
              theme={{
                tooltip: {
                  container: {
                    background: "#333",
                    color: "#fff",
                    fontSize: "12px",
                    borderRadius: "2px",
                    boxShadow: "0 3px 9px rgba(0, 0, 0, 0.5)"
                  }
                }
              }}
            />
          </div>
          <div className={styles.chart}>
            <h2>Monthly Sales</h2>
            <ResponsiveBar
              data={dataBar}
              keys={["count"]}
              indexBy="name"
              margin={{ top: 20, right: 20, bottom: 50, left: 50 }}
              padding={0.3}
              colors={{ scheme: "nivo" }}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Month",
                legendPosition: "middle",
                legendOffset: 32
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Sales",
                legendPosition: "middle",
                legendOffset: -40
              }}
              theme={{
                tooltip: {
                  container: {
                    background: "#333",
                    color: "#fff",
                    fontSize: "12px",
                    borderRadius: "2px",
                    boxShadow: "0 3px 9px rgba(0, 0, 0, 0.5)"
                  }
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
