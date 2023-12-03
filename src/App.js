import React, { useState, useEffect, useRef } from "react";
import { FilterMatchMode } from "primereact/api";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { UserService } from "./service/UserService";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
export default function App() {
  let emptyuser = {
    id: null,
    name: "",
    email: "",
    role: "",
  };

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(emptyuser);
  const [selectedUsers, setSelectedUsers] = useState(null);
  const [filters, setFilters] = useState({
    id: { value: null, matchMode: FilterMatchMode.EQUALS },
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    email: { value: null, matchMode: FilterMatchMode.CONTAINS },
    role: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const toast = useRef(null);
  const dt = useRef(null);

  useEffect(() => {
    UserService.getUsers().then((data) => setUsers(data));
  }, []);

  const deleteuser = (rowData) => {
    let _users = users.filter((val) => val.id !== rowData.id);

    setUsers(_users);
    setUser(emptyuser);
  };

  const deleteSelectedusers = () => {
    console.log(selectedUsers);
    let _users = users.filter((val) => !selectedUsers.includes(val));

    setUsers(_users);
    setSelectedUsers(null);
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => {
            deleteuser(rowData);
          }}
        />
      </React.Fragment>
    );
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => {
            console.log(e.target.value);
            setGlobalFilterValue(e.target.value);
          }}
          placeholder="Search..."
        />
      </span>
      <Button
        label="Delete"
        icon="pi pi-trash"
        severity="danger"
        onClick={(e) => {
          deleteSelectedusers();
        }}
        disabled={!selectedUsers || !selectedUsers.length}
      />
    </div>
  );
  const onRowEditComplete = (e) => {
    let _products = [...users];
    let { newData, index } = e;

    _products[index] = newData;

    setUsers(_products);
  };
  const textEditor = (options) => {
    return (
      <InputText
        type="text"
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
      />
    );
  };
  return (
    <div className="p-5">
      <Toast ref={toast} />
      <div className="card border-1">
        <DataTable
          ref={dt}
          value={users}
          selection={selectedUsers}
          onSelectionChange={(e) => setSelectedUsers(e.value)}
          dataKey="id"
          paginator
          filters={filters}
          globalFilterFields={["name", "email", "role"]}
          emptyMessage="No users found"
          rows={10}
          editMode="row"
          onRowEditComplete={onRowEditComplete}
          currentPageReportTemplate="Page {currentPage} of {totalPages}"
          paginatorTemplate="selectedRowsTemplate CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
          globalFilter={globalFilterValue}
          header={header}
        >
          <Column
            selectionMode="multiple"
            exportable={false}
            headerTooltip="Select All"
          ></Column>

          <Column
            field="name"
            header="Name"
            sortable
            editor={(options) => textEditor(options)}
            style={{ minWidth: "16rem" }}
          ></Column>
          <Column
            field="email"
            header="Email"
            sortable
            editor={(options) => textEditor(options)}
            style={{ minWidth: "10rem" }}
          ></Column>
          <Column
            field="role"
            header="Role"
            sortable
            editor={(options) => textEditor(options)}
            style={{ minWidth: "10rem" }}
          ></Column>
          {/* Merge both columns */}
          <Column
            rowEditor
            header="Edit"
            headerStyle={{ width: "7rem", textAlign: "end" }}
            bodyStyle={{ textAlign: "end" }}
          ></Column>
          <Column
            header="Delete"
            body={actionBodyTemplate}
            headerStyle={{ width: "4rem", textAlign: "start" }}
            bodyStyle={{ textAlign: "center", overflow: "visible" }}
          ></Column>
        </DataTable>
      </div>
    </div>
  );
}
