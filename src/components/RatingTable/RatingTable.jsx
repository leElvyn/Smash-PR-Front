import "./RatingTable.css";
import React from "react";
import { TableContainer, Table, TableHead, TableCell, TableBody, TableRow, TableFooter, TablePagination, TextField } from "@material-ui/core";

const template = ({ displayedRatings, page, total, handleChangePage, search, handleSearch, classes }) => {
  return (
    <React.Fragment>
        <TextField id="playerName" label="Chercher un opposant" className={classes.searchInput} value={search} onChange={handleSearch} />
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>&nbsp;</TableCell>
              <TableCell>Joueur</TableCell>
              <TableCell>Score</TableCell>
              <TableCell>Points</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedRatings.map(rating => (
              <TableRow key={rating.id}>
                <TableCell>{rating.is_winner ? <span className="green">W</span> : <span className="red">L</span>}</TableCell>
                <TableCell>{rating.opponent}</TableCell>
                <TableCell>{rating.winner_score} - {rating.looser_score}</TableCell>
                <TableCell>{rating.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[]}
                count={total}
                rowsPerPage={10}
                page={page}
                onChangePage={handleChangePage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};

export default template;
