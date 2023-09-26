"use client";

import H2 from "../text/H2";
import H3 from "../text/H3";
import Button from "./Button";

export default function ButtonShowcase() {
  return (
    <div className="flex flex-col justify-center items-start w-fit gap-sub-large">
      <H2 type="laptop-large:heading--extra-large heading--large">Button</H2>
      <div className="flex items-start">
        <div className="flex flex-col gap-small ">
          <H3 type="heading">Types</H3>
          <div className="flex flex-col gap-small">
            <div className="flex items-center justify-between gap-large">
              <Button color="primary" shadow="medium" size="small">
                PRIMARY
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-small">
            <div className="flex items-center justify-between gap-large">
              <Button color="secondary" shadow="medium" size="small">
                SECONDARY
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-small">
            <div className="flex items-center justify-between gap-large">
              <Button color="tertiary" shadow="medium" size="small">
                TERTIARY
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-small">
            <div className="flex items-center justify-between gap-large">
              <Button color="error" shadow="medium" size="small">
                ERROR
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-small">
            <div className="flex items-center justify-between gap-large">
              <Button color="success" shadow="medium" size="small">
                SUCCESS
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-small">
            <div className="flex items-center justify-between gap-large">
              <Button color="info" shadow="medium" size="small">
                INFO
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-small">
            <div className="flex items-center justify-between gap-large">
              <Button color="warning" shadow="medium" size="small">
                WARNING
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-small">
            <div className="flex items-center justify-between gap-large">
              <Button color="neutral" shadow="medium" size="small">
                NEUTRAL
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-small">
            <div className="flex items-center justify-between gap-large">
              <Button transparent size="small">
                TRANSPARENT
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between gap-large">
            <Button
              color="primary"
              shadow="clay"
              size="medium"
              rounded="rounded-sub-large"
            >
              CLAY
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-small ">
          <H3 type="heading">Sizes</H3>
          <div className="flex flex-col gap-small">
            <div className="flex items-center justify-between gap-large">
              <Button color="primary" shadow="medium" size="large">
                LARGE
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-small">
            <div className="flex items-center justify-between gap-large">
              <Button color="primary" shadow="medium" size="medium">
                MEDIUM
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-small">
            <div className="flex items-center justify-between gap-large">
              <Button color="primary" shadow="medium" size="small">
                SMALL
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
