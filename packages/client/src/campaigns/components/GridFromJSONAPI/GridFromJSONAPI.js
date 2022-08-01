import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const getColumnsFromData = (data) => {
    if (!data || data.length === 0) {
        // Cannot determine columns from data
        return [];
    }

    return Object.keys(data[0]);
};

const GridFromJSONAPI = ({
    columns: suggestedColumns,
    data: rawResponse,
    actionColumn: ActionColumn,
}) => {
    const columns = suggestedColumns || getColumnsFromData(rawResponse.data);

    return (
        <Table>
            <TableHead>
                <TableRow>
                    {columns.map((col, i) => {
                        if (col instanceof Array) {
                            return <TableCell key={i}>{col[0]}</TableCell>
                        } else {
                            return <TableCell key={i}>{col}</TableCell>;
                        }
                    }
                    )}
                    {ActionColumn && (
                        <TableCell key={'Actions'}>Actions</TableCell>
                    )}
                </TableRow>
            </TableHead>
            <TableBody>
                {rawResponse.data.map(row => (
                    <TableRow key={row.name}>
                        {columns.map((key) => {
                            console.log(key);
                            if (key instanceof Array) {
                                if (typeof key[1] === 'function') {
                                    return <TableCell key={key}>{key[1](row)}</TableCell>;
                                } else {
                                    return <TableCell key={key}>{row[key[1]]}</TableCell>;
                                }
                            } else {
                                return <TableCell key={key}>{row[key]}</TableCell>;
                            }
                        }
                        )}
                        {ActionColumn && (
                            <TableCell key={'Actions'}>
                                <ActionColumn
                                    row={row}
                                />
                            </TableCell>
                        )}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default GridFromJSONAPI;
