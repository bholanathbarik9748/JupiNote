import React, { useState, useEffect } from 'react';
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import getCookies from '../../hooks/Cookie/getCookie';
import axios from 'axios';
import api from '../../../api';

const Profile = () => {
  const [username, setUserName] = useState("");
  const [Bin, setBin] = useState(0);
  const [total, setTotal] = useState(0);
  const [Delete, setDelete] = useState(0);
  const [active, setActive] = useState(0);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  const FetchApiData = async (username) => {
    console.log(username);
    const { data } = await axios.get(`${api}/v1/user/notes/info/${username}`);
    setTotal(data.total_Note);
    setDelete(data.delete);
    setActive(data.total_Active_Note);
    setBin(data.bin);
  }


  useEffect(() => {
    setUserName(getCookies("username"));
    FetchApiData(getCookies("username"));
  }, [])

  const data = {
    labels: ['Create', 'In bin', 'delete', 'active'],
    datasets: [
      {
        backgroundColor: ['#00FF00', '#FFED01', '#FF0000','#0064FF'],
        data: [total, Bin, Delete,active],
      },
    ],
  };

  return (
    <>
      <section className="text-gray-600 ml-20 mt-10 justify-center body-font overflow-hidden">
        <div className="container">
          <div className="lg:w-4/5 flex flex-wrap">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">{username}</h1>
              <p className="leading-relaxed mb-4"> <b>IMPORTANT:</b> this Graphs in dashboards provide visual representations of data, enabling quick understanding of Create, delete, and in Bin. They facilitate data analysis, comparison of multiple data sets, and effective communication of insights, enhancing decision-making and usability of the dashboard.</p>
              <div className="flex border-t border-gray-200 py-2">
                <span className="text-gray-500">Note Create</span>
                <span className="ml-auto text-gray-900">{total}</span>
              </div>
              <div className="flex border-t border-gray-200 py-2">
                <span className="text-gray-500">Active Note</span>
                <span className="ml-auto text-gray-900">{active}</span>
              </div>
              <div className="flex border-t border-gray-200 py-2">
                <span className="text-gray-500">Move to Bin</span>
                <span className="ml-auto text-gray-900">{Bin}</span>
              </div>
              <div className="flex border-t border-b mb-6 border-gray-200 py-2">
                <span className="text-gray-500">Delete permanently</span>
                <span className="ml-auto text-gray-900">{Delete}</span>
              </div>
            </div>
            <div className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded">
              <Pie data={data} options={options} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Profile