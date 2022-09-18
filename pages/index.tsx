import type { NextPage } from "next";
import TopSidebar from "../components/topSidebar";
import { Table, TableBody, TableHead, TableRow } from "../components/table";
import { useState, useEffect } from "react";
import styles from "../styles/home.module.scss";
import RangeDatePicker, { RangeType } from "../components/rangeDatePicker";
import { format, eachDayOfInterval, formatISO, getDay } from "date-fns";
import Button from "../components/button";
import { UserType } from "./api/users";
import { FiPrinter } from "react-icons/fi";
import Image from "next/image";
import AddedCard from "../components/addedCard";
import Dialog from "@reach/dialog";
import "@reach/dialog/styles.css";

const tabs = [
  { text: "schedule", url: "/" },
]
const mapDays = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat"
]
const Home: NextPage = () => {
  const [range, setRange] = useState<RangeType>({ startDate: new Date(), endDate: new Date(), differenceRange: 0, key: "selection" });
  const [users, setUsers] = useState<UserType[]>([]);
  const [newEvent, setNewEvent] = useState<Date | null>(null)

  useEffect(() => {
    fetch("/api/users")
      .then((data) => data.json())
      .then(e => setUsers(e)) 
  }, []);

  return (
    <div className={styles.HomePage}>
      <TopSidebar tabs={tabs}/>
      <section className={styles.TableAction}>
        <RangeDatePicker onChange={(e: RangeType) => setRange(e)}/>
        <Button icon={<FiPrinter />} >Print Schedule</Button>
      </section>
      <section className={styles.TableSection}>
        <Table>
          <TableHead>
            <TableRow>
              <th className={styles.FlexibleSchedule}>
                Flexible schedule
                <span>Switch</span>
              </th>
              {eachDayOfInterval({start: range.startDate, end: range.endDate}).map((item, index) => {
                return (
                  <th key={index}>{mapDays[getDay(item)]} {index}/ {range.differenceRange}</th>
                )
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user: UserType, index) => (
              <TableRow key={index}>
                <td className={styles.UserDetails}>
                  <span className={styles.Avatar}>
                    <Image width={32} height={32} layout="fixed" alt="avatar" src={user.avatar} />
                  </span>
                  <span className={styles.Name}>{user.name}</span>
                </td>
                {console.log(eachDayOfInterval({start: range.startDate, end: range.endDate}))}
                {eachDayOfInterval({start: range.startDate, end: range.endDate}).map((item, indx) => (
                  <td key={indx}>
                    <AddedCard onClick={(date: Date)=> setNewEvent(date)} date={item}/>
                  </td>
                ))}
              </TableRow>
            ))}
          </TableBody>
          <Dialog isOpen={!!newEvent} onDismiss={() => setNewEvent(null)}>

          </Dialog>
        </Table>
      </section>
    </div>
  )
}

export default Home
