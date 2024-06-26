"use client";
import React from "react";

import PageTitle from "../../../components/Typography/PageTitle";
import SectionTitle from "../../../components/Typography/SectionTitle";
import CTA from "../../../components/CTA";
import InfoCard from "../../../components/Cards/InfoCard";
import { Card, CardBody } from "@windmill/react-ui";
import { Comments, ShoppingCart, MoneyBill, UserFriends } from "../../../icons";
// import RoundIcon from "../../components/RoundIcon";

function Cards() {
  return (
    <>
      <PageTitle>Cards</PageTitle>

      <CTA />

      <SectionTitle>Big section cards</SectionTitle>

      <Card className="mb-8 shadow-md">
        <CardBody>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Large, full width sections goes here
          </p>
        </CardBody>
      </Card>

      <SectionTitle>Responsive cards</SectionTitle>

      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Total clients" value="6389">
          <div className="text-orange-500 dark:text-orange-100 bg-orange-100 dark:bg-orange-500 ">
            {UserFriends}
          </div>
        </InfoCard>

        <InfoCard title="Account balance" value="$ 46,760.89">
          <div className="text-green-500 dark:text-green-100 bg-green-100 dark:bg-green-500">
            {MoneyBill}
          </div>
        </InfoCard>

        <InfoCard title="New sales" value="376">
          <div className="text-blue-500 dark:text-blue-100 bg-blue-100 dark:bg-blue-500">
            {ShoppingCart}
          </div>
        </InfoCard>

        <InfoCard title="Pending contacts" value="35">
          <div className="text-teal-500 dark:text-teal-100 bg-teal-100 dark:bg-teal-500">
            {Comments}
          </div>
        </InfoCard>
      </div>

      <SectionTitle>Cards with title</SectionTitle>

      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <Card>
          <CardBody>
            <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">
              Revenue
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga,
              cum commodi a omnis numquam quod? Totam exercitationem quos hic
              ipsam at qui cum numquam, sed amet ratione! Ratione, nihil
              dolorum.
            </p>
          </CardBody>
        </Card>

        <Card colored className="text-white bg-purple-600">
          <CardBody>
            <p className="mb-4 font-semibold">Colored card</p>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga,
              cum commodi a omnis numquam quod? Totam exercitationem quos hic
              ipsam at qui cum numquam, sed amet ratione! Ratione, nihil
              dolorum.
            </p>
          </CardBody>
        </Card>
      </div>
    </>
  );
}

export default Cards;
