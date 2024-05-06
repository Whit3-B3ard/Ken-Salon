"use client"
import React from 'react'
import { Link } from 'next/link'
import { CiHeart } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";


import PageTitle from '../../../components/Typography/PageTitle'
import SectionTitle from '../../../components/Typography/SectionTitle'

import { Button } from '@windmill/react-ui'

function Buttons() {
  return (
    <>
      <PageTitle>Buttons</PageTitle>

      

      <SectionTitle>Primary</SectionTitle>
      <div className="flex flex-col flex-wrap mb-8 space-y-4 md:flex-row md:items-end md:space-x-4">
        <div>
          <Button size="larger">Larger Button</Button>
        </div>

        <div>
          <Button size="large">Large Button</Button>
        </div>

        <div>
          <Button>Regular</Button>
        </div>

        <div>
          <Button tag={Link} to="/dashboard">
            Router Link
          </Button>
        </div>

        <div>
          <Button disabled>Disabled</Button>
        </div>

        <div>
          <Button size="small">Small</Button>
        </div>
      </div>

      <SectionTitle>Outline</SectionTitle>
      <div className="flex flex-col flex-wrap mb-8 space-y-4 md:flex-row md:items-end md:space-x-4">
        <div>
          <Button layout="outline" size="larger">
            Larger Button
          </Button>
        </div>

        <div>
          <Button layout="outline" size="large">
            Large Button
          </Button>
        </div>

        <div>
          <Button layout="outline">Regular</Button>
        </div>

        <div>
          <Button layout="outline" tag={Link} to="/dashboard">
            Router Link
          </Button>
        </div>

        <div>
          <Button layout="outline" disabled>
            Disabled
          </Button>
        </div>

        <div>
          <Button layout="outline" size="small">
            Small
          </Button>
        </div>
      </div>

      <SectionTitle>Link</SectionTitle>
      <div className="flex flex-col flex-wrap mb-8 space-y-4 md:flex-row md:items-end md:space-x-4">
        <div>
          <Button layout="link" size="larger">
            Larger Button
          </Button>
        </div>

        <div>
          <Button layout="link" size="large">
            Large Button
          </Button>
        </div>

        <div>
          <Button layout="link">Regular</Button>
        </div>

        <div>
          <Button layout="link" tag={Link} to="/dashboard">
            Router Link
          </Button>
        </div>

        <div>
          <Button layout="link" disabled>
            Disabled
          </Button>
        </div>

        <div>
          <Button layout="link" size="small">
            Small
          </Button>
        </div>
      </div>

      <SectionTitle>Icons</SectionTitle>
      <div className="flex flex-col flex-wrap mb-8 space-y-4 md:flex-row md:items-end md:space-x-4">
        <div>
          <Button>
            <CiHeart />
            <span>Icon right</span>
          </Button>
        </div>

        <div>
          <Button >
          <CiHeart />
            <span>Icon Left</span>
          </Button>
        </div>

        <div>
          <button><CiHeart /></button>
        </div>

        <div>
          <button><FaEdit  /></button>
        </div>

        <div>
          <button><CiHeart /></button>
        </div>
        <div>
          <button><CiHeart /></button>
        </div>
      </div>
    </>
  )
}

export default Buttons
