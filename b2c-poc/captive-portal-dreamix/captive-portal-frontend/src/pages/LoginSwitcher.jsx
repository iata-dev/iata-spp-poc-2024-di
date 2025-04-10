import { useEffect, useState } from "react";
import {useNavigate} from "react-router";

import {getConfiguration} from "@/api/client.js";
import Banner from '@/components/Banner.jsx';
import {Button} from "@/components/ui/button.jsx";
import {Container} from '@/layout/Container.jsx';
import {Page} from '@/layout/Page.jsx';

const DescriptionTable = () => {
  const [tableOptions, setTableOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getConfiguration()
      .then((res) => {
        if (!res.body) {
          throw new Error("API response is missing body");
        }

        const formattedData = Object.keys(res.body).map((key) => ({
          type: res.body[key].type,
          issuer: res.body[key].issuer,
          wallet: res.body[key].wallet,
          verifier: res.body[key].verifier,
        }));
        setTableOptions(formattedData);
      })
      .catch((err) => {
        setError(err.message || "Error fetching data");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);


  if (loading) return <p>Loading table data...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="flex flex-col gap-3 bg-gray-100 p-3 rounded-[0.5rem]">
      <table className="w-full border-collapse border border-gray-300 text-xs">
        <thead>
        <tr className="bg-gray-200">
          <th className="border border-gray-300 px-3 py-2 text-left">Flow Option</th>
          <th className="border border-gray-300 px-3 py-2 text-left">Issuer</th>
          <th className="border border-gray-300 px-3 py-2 text-left">Wallet</th>
          <th className="border border-gray-300 px-3 py-2 text-left">Verifier</th>
        </tr>
        </thead>
        <tbody>
        {tableOptions.map((option, index) => (
          <tr key={index} className={index % 2 === 0 ? "" : "bg-gray-50"}>
            <td className="border border-gray-300 px-3 py-2">{option.type}</td>
            <td className="border border-gray-300 px-3 py-2">{option.issuer}</td>
            <td className="border border-gray-300 px-3 py-2">{option.wallet}</td>
            <td className="border border-gray-300 px-3 py-2">{option.verifier}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export const LoginSwitcher = () => {
  let navigate = useNavigate();

  const handleRedirect = (path) => {
    navigate(path);
  };

  return (
    <Page className="min-h-screen flex flex-col">
      <Banner
        title="Welcome to Kronos IATA Portal"
        description="This page is dedicated for presenters"
      />
      <Container className="py-5 flex flex-col flex-grow">
        <div className="flex flex-col gap-3 flex-grow">
          <p className="text-balance text-sm font-semibold leading-[1.25rem]">
            Please choose which demo you want to showcase
          </p>

          <div className="flex flex-col gap-4 mt-6">
            <Button
              className="w-full"
              variant="secondary"
              onClick={() => handleRedirect('ground-wifi')}
            >
              <div className="font-normal text-base leading-[1.25rem]">Ground Wi-Fi</div>
            </Button>
            <Button
              className="w-full"
              variant="secondary"
              onClick={() => handleRedirect('login-lounge')}
            >
              <div className="font-normal text-base leading-[1.25rem]">Lounge entrance</div>
            </Button>
            <Button
              className="w-full"
              variant="secondary"
              onClick={() => handleRedirect('board')}
            >
              <div className="font-normal text-base leading-[1.25rem]">Board Wi-Fi</div>
            </Button>
          </div>
        </div>
      </Container>
    </Page>
  );
};
