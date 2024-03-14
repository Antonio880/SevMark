import { TextField, Button } from "@mui/material";

export default function SearchBar() {
  return (
    <div className="flex flex-wrap justify-center pt-7">
      <div className="">
        <TextField
          id="outlined-basic"
          label="Procure Aqui"
          variant="outlined"
          sx={{ 
              width: "450px", 
              ":focus": {
                  borderColor: "rgb(255, 173, 113)"
              }
          }}
        />
      </div>
      <div className="flex pt-2 sm:pt-0">
        <Button
          disabled={true}
          variant="contained"
          sx={{
            backgroundColor: "rgb(255, 173, 113)",
            marginLeft: "25px",
            "&:hover": {
              backgroundColor: "rgb(255, 124, 28)",
              color: "white", // Se desejar mudar a cor do texto no hover
            },
          }}
        >
          Search
        </Button>
      </div>
    </div>
  );
}
