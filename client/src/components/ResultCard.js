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
          <ListItem> Domain: {lookupData.name} </ListItem>
          <ListItem> IP Address: {lookupData.ips} </ListItem>
          <ListItem> Longitude: {lookupData.longitude?.toString()} </ListItem>
          <ListItem> Latitude: {lookupData.latitude?.toString()} </ListItem>
          <ListItem>Registered: {lookupData.registered?.toString()}</ListItem>
          {lookupData.contacts?.owner?.map((owner) => (
            <>
              <ListItem>Owner Name: {owner.name} </ListItem>
              <ListItem>Owner Organization: {owner.organization}</ListItem>
              <ListItem>Owner State: {owner.state}</ListItem>
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
    name: PropTypes.string,
    ips: PropTypes.string,
    longitude: PropTypes.number,
    latitude: PropTypes.number,
    registered: PropTypes.bool,
    contacts: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default ResultCard;
