import React, { useEffect, useState } from "react";
import Loading from "../../components/loading";
import { NavVar } from "../../components/navBar";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchUsersStudy } from "../../actions/studies";
import { useTable } from "react-table";
import BarGraph from "../../components/ui/graph/barGraph";
import LineGraph from "../../components/ui/graph/lineGraph";

//dispatch(fetchUsersStudy(element.id));

export const StudyDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoadingUser] = useState(true);
  const [data, setData] = useState(() => []);
  const { users } = useSelector((state) => state.studies);
  useEffect(() => {
    dispatch(fetchUsersStudy(id));
    setLoadingUser(false);
  }, [dispatch, id]);

  useEffect(() => {
    if (users != null && users[id] != null) {
      setData(
        users[id]?.map((user) => ({
          col1: user.id,
          col2: user.id,
        }))
      );
    }
  }, [users, id]);

  const columns = React.useMemo(
    () => [
      {
        Header: "UserId",
        accessor: "col1", // accessor is the "key" in the data
      },
      {
        Header: "UserId2",
        accessor: "col2",
      },
    ],
    []
  );

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

  if (loading) {
    return <Loading />;
  } else {
    return (
      <>
        <NavVar />
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
        <BarGraph
          data={[
            { x: "A", y: 1 },
            { x: "B", y: 2 },
            { x: "C", y: 3 },
          ]}
        />
        <LineGraph
          width={500}
          xDomain={[0, 4]}
          yDomain={[-5, 15]}
          data={[
            { x: 0, y: 0 },
            { x: 1, y: 3 },
            { x: 2, y: 3 },
            { x: 3, y: -5 },
            { x: 4, y: 15 },
          ]}
        />
      </>
    );
  }
};
