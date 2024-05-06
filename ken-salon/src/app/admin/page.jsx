"use client";
import React, { useState, useEffect } from "react";
import {
  Chart,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import InfoCard from "../../components/Cards/InfoCard";
import ChartCard from "../../components/Chart/ChartCard";
import { Doughnut, Line, Bar } from "react-chartjs-2";
import ChartLegend from "../../components/Chart/ChartLegend";
import PageTitle from "../../components/Typography/PageTitle";
import { Comments, ShoppingCart, MoneyBill, UserFriends } from "../../icons";
import response from "../../utils/demo/tableData";
import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Avatar,
  Badge,
  Pagination,
} from "@windmill/react-ui";

import {
  doughnutOptions,
  lineOptions,
  barOptions,
  doughnutLegends,
  lineLegends,
  barLegends,
} from "../../utils/demo/chartsData";
import axios from "axios";
import { baseUrl } from '@/api/ports';

function Dashboard() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const resultsPerPage = 10;
  const totalResults = response.length;

  useEffect(() => {
    const fetchUsers = async () => {
        try {
           
            const usersRes = await axios.get(`${baseUrl}/api/users`);
            
            setUsers(usersRes.data);
        } catch (err) {
            console.error('Failed to fetch  users:', err);
        }
    };

    fetchUsers();
}, []);
console.log(baseUrl)
console.log(users)
  function onPageChange(p) {
    setPage(p);
  }
  useEffect(() => {
    setData(response.slice((page - 1) * resultsPerPage, page * resultsPerPage));
  }, [page]);

  Chart.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
  );
  return (
    <div
      className="h-screen overflow-hidden"
      onWheel={(e) => {
        // Scroll programmatically
        const container = e.currentTarget;
        container.scrollTo({
          top: container.scrollTop + e.deltaY * 4, // Increase the scroll amount for faster scrolling
          behavior: "smooth",
        });
      }}
    >
      <PageTitle>Dashboard</PageTitle>
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard
          className="flex justify-between"
          title="Total clients"
          value={users.length}
        >
          <div className="text-orange-500 ">{UserFriends}</div>
        </InfoCard>

        <InfoCard title="Revenue" value="AED 46,760.89">
          <div className="text-green-500">{MoneyBill}</div>
        </InfoCard>

        <InfoCard title="New sales" value="376">
          <div className="text-blue-500">{ShoppingCart}</div>
        </InfoCard>

        <InfoCard title="Pending Reservations" value="35">
          <div className="text-teal-500">{Comments}</div>
        </InfoCard>
      </div>

      <PageTitle>Charts</PageTitle>
      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <ChartCard title="Revenue">
          <Doughnut {...doughnutOptions} />
          <ChartLegend legends={doughnutLegends} />
        </ChartCard>

        <ChartCard title="Traffic">
          <Line {...lineOptions} />
          <ChartLegend legends={lineLegends} />
          <ChartCard title="Bars">
            <Bar {...barOptions} />
            <ChartLegend legends={barLegends} />
          </ChartCard>
        </ChartCard>
      </div>
      {/* <!-- Cards --> */}

      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Client</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data.map((user, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <Avatar
                      className="hidden mr-3 md:block"
                      src={user.avatar}
                      alt="User image"
                    />
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {user.job}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">$ {user.amount}</span>
                </TableCell>
                <TableCell>
                  <Badge type={user.status}>{user.status}</Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {new Date(user.date).toLocaleDateString()}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            label="Table navigation"
            onChange={onPageChange}
          />
        </TableFooter>
      </TableContainer>
    </div>
  );
}

export default Dashboard;
