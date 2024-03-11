		
CREATE TABLE Users
(
    id INT PRIMARY KEY IDENTITY(1,1),
    Name VARCHAR(40),
    Email VARCHAR(40),
    Password VARCHAR(15),
                    
);            

CREATE TABLE Travel
(
    id INT PRIMARY KEY IDENTITY(1,1),
    name VARCHAR(40),
    travel_date_initial DATE,
    travel_date_final DATE,
	fk_id_user INT,
	FOREIGN KEY(fk_id_user) REFERENCES Users (id),
);

	CREATE TABLE Baggage
(
    id INT PRIMARY KEY IDENTITY(1,1),
    item VARCHAR(MAX),
	fk_id_travel INT,
	FOREIGN KEY(fk_id_travel) REFERENCES Travel (id)              
);


CREATE TABLE Passage
(
    Id INT PRIMARY KEY IDENTITY(1,1),
    departure_date DATE,
	return_date DATE,
	number_of_people INT,
	transport VARCHAR(15),
	amount_baggage INT,
	total_cost float,
	fk_id_travel INT,
	FOREIGN KEY(fk_id_travel) REFERENCES Travel (id)      
);
 
CREATE TABLE Hosting
(
    Id INT PRIMARY KEY IDENTITY(1,1),
	address VARCHAR(40),
    check_in_date DATE,
	check_out_date DATE,
	total_cost float,
	fk_id_travel INT,
	FOREIGN KEY(fk_id_travel) REFERENCES Travel (id)      
);

CREATE TABLE Feeding
(
    Id INT PRIMARY KEY IDENTITY(1,1),
	local VARCHAR(40),
	address VARCHAR(40),
    date DATE,
	hour VARCHAR(10),
	total_cost float,
	fk_id_travel INT,
	FOREIGN KEY(fk_id_travel) REFERENCES Travel (id)      
);

CREATE TABLE Tour
(
    Id INT PRIMARY KEY IDENTITY(1,1),
	local VARCHAR(40),
	address VARCHAR(40),
    date DATE,
	hour VARCHAR(10),
	transport VARCHAR(15),
	total_cost float,
	fk_id_travel INT,
	FOREIGN KEY(fk_id_travel) REFERENCES Travel (id)      
);

CREATE TABLE Emergency
(
    Id INT PRIMARY KEY IDENTITY(1,1),
	hospital_address VARCHAR(40),
	fire_brigade_number VARCHAR(15),
    ambulance_number VARCHAR(15),
	police_number VARCHAR(15),		
	fk_id_travel INT,
	FOREIGN KEY(fk_id_travel) REFERENCES Travel (id)      
);




