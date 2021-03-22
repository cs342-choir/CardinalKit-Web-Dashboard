import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDataStudy } from "../../../actions/studies";
import { useTable } from "react-table";

export const SurveyGraph = () => {
  const [data, setData] = useState(() => []);
  const [columns, setColumns] = useState(() => []);

  const { studyTypeData } = useSelector((state) => state.studies);
  const dispatch = useDispatch();
  const { studyId } = useParams();

  const [shortWalk, setShortWalk] = useState([]);
  useEffect(() => {
    dispatch(getDataStudy(studyId, "surveys"));
  }, [dispatch, studyId, data, studyTypeData]);

  useEffect(() => {
    if (studyTypeData != null && studyTypeData[studyId] != null) {
      let data = studyTypeData[studyId]["surveys"]["ShortWalkTask"];
      setShortWalk(data);
    }
  }, [studyTypeData, studyId, data]);

  useEffect(() => {
      let counter=0
    if (shortWalk != null) {
      let obj = [];
      let _Columns = [];
      const Headers = [
        { Header: "userId", accessor: "user" },
        { Header: "updateAt", accessor: "update" },
      ];
      shortWalk.map((entry) =>
        entry.results.map((result) => {
          let row = {};
          for (let key in result) {
            if (key !== "results") {
              if (!_Columns.includes(key)) {
                _Columns.push(key);
                Headers.push({ Header: key, accessor: key });
              }
              row[key] = JSON.stringify(result[key]);
            }
          }
          row["user"] = entry.userId;
          row["update"] = entry.updatedAt.toDate().toString();
          result.results.forEach((element) => {
            let rowCopy = { ...row };
            for (let key in element) {
              if (!_Columns.includes(`R_${key}`)) {
                _Columns.push(`R_${key}`);
                Headers.push({ Header: `R_${key}`, accessor: `R_${key}` });
              }
              rowCopy[`R_${key}`] = JSON.stringify(element[key]);
              obj.push(rowCopy);
              counter++
            }
          });
          console.log("counter",counter,entry.userId);
        })
      );
        console.log("counter",counter);
      setColumns(Headers);
      setData(obj);
    }
  }, [shortWalk]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  return (
    <>
      <h1>Short Walk Task</h1>
      <table {...getTableProps()} style={{ border: "solid 1px blue" }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    borderBottom: "solid 3px red",
                    background: "aliceblue",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: "10px",
                        border: "solid 1px gray",
                        background: "papayawhip",
                      }}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <h1>Survey Task Assessment</h1>

      <h1>Survey Task Assessment</h1>

      <h1>Feedback</h1>
    </>
  );
};
