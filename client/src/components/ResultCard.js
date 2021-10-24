import { React } from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

const ResultCard = (props) => {
  const { lookupData } = props;

  const gatherContent = () => (
    <List alignitems="flex-start" dense>
      {Object.keys(lookupData).length > 0 ? (
        <>
        <ListItem> Domain: {lookupData.domain} </ListItem>
        <ListItem> IP Address: {lookupData.ip} </ListItem>
        <ListItem> Longitude: {lookupData.longitude} </ListItem>
        <ListItem> Latitude: {lookupData.latitude} </ListItem>
        <ListItem>Registered: {lookupData.registered?.toString()}</ListItem>
        {lookupData.owners?.map((owner) => (
          <>
            <ListItem>Owner Name: {owner.name} </ListItem>
            <ListItem>Owner Organization: {owner.organization}</ListItem>
            <ListItem>Owner Region: {owner.region}</ListItem>
            <ListItem>Owner Country: {owner.country}</ListItem>
          </>
        ))}
      </>
      ) : undefined}
    </List>
  );

  return (
    <Card style={{ width: "400px", maxWidth: "75vh" }}>
      <CardContent>
        {gatherContent()}
      </CardContent>
    </Card>
  );
};

ResultCard.propTypes = {
  lookupData: PropTypes.shape({
    domain: PropTypes.string,
    ip: PropTypes.string,
    longitude: PropTypes.number,
    latitude: PropTypes.number,
    registered: PropTypes.bool,
    owners: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default ResultCard;
