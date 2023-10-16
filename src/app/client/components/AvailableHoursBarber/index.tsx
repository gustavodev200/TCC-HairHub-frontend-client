import { Employee } from "@/@types/employee";
import { getDayFromNumber } from "@/helpers/utils/getDayFromNumber";
import { Spin } from "antd";
import dayjs from "dayjs";
import React from "react";
import styled from "styled-components";

interface AvailableHoursBarberProps {
  employeeInfo: Employee;
}

const AvailableHoursBarber = ({ employeeInfo }: AvailableHoursBarberProps) => {
  return (
    <AddressGap>
      {employeeInfo &&
        employeeInfo.shifts &&
        employeeInfo.shifts.length > 0 && (
          <AddressContainer key={employeeInfo.id}>
            {employeeInfo.shifts.map((shift, index) => (
              <AddressGap key={shift.id}>
                <strong>Agenda {index + 1}: </strong>
                <span>
                  {dayjs(shift.start_time).format("HH:mm")} às
                  <span> {dayjs(shift.end_time).format("HH:mm")} Horas</span>
                </span>

                <AvailableDaysGap>
                  <strong>Dias disponíveis: </strong>
                  <span>
                    {shift.available_days.map((day, index) => (
                      <>
                        <AvailableDaysContent key={`${shift.id}-${index}`}>
                          {getDayFromNumber(day)}
                        </AvailableDaysContent>
                      </>
                    ))}
                  </span>
                </AvailableDaysGap>
              </AddressGap>
            ))}
          </AddressContainer>
        )}
    </AddressGap>
  );
};

const AddressContainer = styled.div`
  margin-top: 20px;
`;

const AddressGap = styled.div`
  margin-bottom: 12px;
`;

const AvailableDaysGap = styled.div`
  margin-top: 8px;
`;

const AvailableDaysContent = styled.span`
  margin-right: 8px;
  background-color: #669cff;
  border-radius: 4px;
  padding: 2px 5px;
  color: #fff;
`;

export default AvailableHoursBarber;
