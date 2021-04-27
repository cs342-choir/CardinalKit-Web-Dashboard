import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getDataStudy } from "../../../actions/studies";
import Table from "../../../components/ui/table";
import { NavVar } from "../../../components/navBar";

export const SurveyGraph = () => {
  const dispatch = useDispatch();

  const [_rows, _setRows] = useState(() => ({
    ShortWalkTask: [{ user: "userId" }],
  }));
  const [_columns, setColumns] = useState(() => ({
    ShortWalkTask: [{ Header: "userId", accessor: "user" }],
  }));

  const [_data, _setData] = useState([]);

  const { studyTypeData } = useSelector((state) => state.studies);
  const { studyId } = useParams();

  useEffect(() => {
    dispatch(getDataStudy(studyId, "surveys"));
  }, [dispatch, studyId]);

  useEffect(() => {
    if (studyTypeData != null && studyTypeData[studyId] != null) {
      let data = studyTypeData[studyId]["surveys"];
      _setData(data);
    }
  }, [studyTypeData, studyId]);

  useEffect(() => {
    let _allRows = { ..._rows };
    let _allColumns = { ..._columns };
    for (let keyData in _data) {
      if (_data[keyData] != null) {
        let rows = [];
        let columns = [];
        const Headers = [
          { Header: "userId", accessor: "user" },
          { Header: "updateAt", accessor: "update" },
        ];
        let counter = 0;
        _data[keyData].map((entry) => {
          // console.log("entry",entry);
          entry.results.map((result) => {
            // console.log("result",result);
            let row = {};
            for (let keyRow in result) {
              // console.log("keyRow",keyRow);
              if (keyRow !== "results") {
                if (!columns.includes(keyRow)) {
                  columns.push(keyRow);
                  Headers.push({ Header: keyRow, accessor: keyRow });
                }
                row[keyRow] = JSON.stringify(result[keyRow]);
              }
              row["user"] = entry.userId;
              row["update"] = entry.updatedAt.toDate().toString();
            }
            result.results.forEach((element) => {
              // console.log("subResult",element);
              let rowCopy = { ...row };
              for (let key in element) {
                if (key !== "results") {
                  if (!columns.includes(`R_${key}`)) {
                    columns.push(`R_${key}`);
                    Headers.push({ Header: `R_${key}`, accessor: `R_${key}` });
                  }
                  rowCopy[`R_${key}`] = JSON.stringify(element[key]);
                }
              }
              if (element.results !== undefined && element.results.length > 0) {
                element.results.forEach((newElement) => {
                  let newRowCopy = { ...rowCopy };
                  for (let key in newElement) {
                    // if (key !== "results") {
                      if (!columns.includes(`R_R_${key}`)) {
                        columns.push(`R_R_${key}`);
                        Headers.push({
                          Header: `R_R_${key}`,
                          accessor: `R_R_${key}`,
                        });
                      }
                      newRowCopy[`R_R_${key}`] = JSON.stringify(newElement[key]);
                    // }
                  }
                  counter++;
                  rows.push(newRowCopy);
                });
               
              } else {
                counter++;
                rows.push(rowCopy);
              }
            });
            return {};
          });
          return {};
        });
        console.log("counter", counter, `${keyData}`);
        _allRows[keyData] = rows;
        _allColumns[keyData] = Headers;
      }
      _setRows(_allRows);
      setColumns(_allColumns);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_data]);

  return (
    <>
      <NavVar></NavVar>
      <h1>surveys</h1>
      {Object.keys(_data).map((item) => {
        return (
          <>
            <h1>{item}</h1>
            {_rows[item] && (
              <Table data={_rows[item]} columns={_columns[item]}></Table>
            )}
          </>
        );
      })}
    </>
  );
};
