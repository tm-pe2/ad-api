require('./src/server');

import {execute} from './utils/mysql.connector';

module.exports = async () => {
    await execute<any>(truncateTablesQuery, []);
    await execute<any>(insertDummyDataQuery, []);
};

const truncateTablesQuery = `
    TRUNCATE roles, address, users, customers, employees, suppliers, tariffs, tickets, invoices, estimations, customercontracts, planning RESTART IDENTITY CASCADE;
`;

const insertDummyDataQuery = `
    INSERT INTO roles (name, description)
        VALUES 
        ('role1', 'descr1'),
        ('role2', 'descr2'),
        ('role3', 'descr3');
        
    INSERT INTO address (city, street, house_number, postal_code, country, start_date, end_date)
        VALUES 
        ('city1', 'street1', '1', '1000', 'Belgium', '2000-01-01', '2023-01-01'),
        ('city2', 'street2', '2', '2000', 'Netherlands', '2001-01-01', '2024-01-01'),
        ('city3', 'street3', '3', '3000', 'France', '2002-01-01', '2025-01-01'),
        ('city4', 'street4', '4', '4000', 'Spain', '2003-01-01', '2026-01-01'),
        ('city5', 'street5', '5', '5000', 'Germany', '2004-01-01', '2027-01-01'),
        ('city6', 'street6', '6', '6000', 'Sweden', '2005-01-01', '2028-01-01');    
    
    INSERT INTO users (role_id, first_name, last_name, birth_date, address_id, email, phone_number, password, national_registry_number)
        VALUES 
        (1, 'fn1', 'ln1', '2000-01-01', 1, 'email1@email.com', '0123456781', 'pw1', 1001),
        (2, 'fn2', 'ln2', '2001-01-01', 2, 'email2@email.com', '0123456782', 'pw2', 1002),
        (3, 'fn3', 'ln3', '2002-01-01', 3, 'email3@email.com', '0123456783', 'pw3', 1003),
        (4, 'fn4', 'ln4', '2003-01-01', 4, 'email4@email.com', '0123456784', 'pw4', 1004),
        (5, 'fn5', 'ln5', '2004-01-01', 5, 'email5@email.com', '0123456785', 'pw5', 1005),
        (6, 'fn6', 'ln6', '2005-01-01', 6, 'email6@email.com', '0123456786', 'pw6', 1006);    
        
    INSERT INTO customers (gas_type, electricity_type, gas_meter_id, electricity_meter_id, user_id)
        VALUES 
        (1, 1, 1, 1, 1),
        (2, 2, 2, 2, 2),
        (3, 3, 3, 3, 3);
        
    INSERT INTO employees (department, permissions, hire_date, gender, salary, user_id)
        VALUES 
        ('dep1', 0, '2022-01-01', 0, 3000, 4),
        ('dep2', 1, '2022-01-02', 1, 4000, 5),
        ('dep3', 2, '2022-01-03', 0, 5000, 6);
        
    INSERT INTO suppliers (name, supply_type, company_name, address_id)
        VALUES 
        ('supplier1', 'supplyType1', 'companyName1', 1),
        ('supplier2', 'supplyType2', 'companyName2', 2),
        ('supplier3', 'supplyType3', 'companyName3', 3);
        
    INSERT INTO tariffs (small_ind, medium_ind, big_ind, small_comp, medium_comp, big_comp)
        VALUES 
        (10, 20, 30, 40, 50, 60),
        (15, 25, 35, 45, 55, 65),
        (20, 30, 40, 50, 60, 70);
        
    INSERT INTO tickets (issue_id, assigned_tech, title, description, date, is_employee)
        VALUES 
        (1, 0, 'title1', 'descr1', '2000-01-01', true),
        (2, 1, 'title2', 'descr2', '2001-01-01', false),
        (3, 0, 'title3', 'descr3', '2002-01-01', true);
        
    INSERT INTO invoices (customer_id, supplier_id, creation_date, due_date, status_id, gas_amount, electricity_type, price, tax, start_date, end_date)
        VALUES 
        (1, 1, '2000-01-01', '2000-02-01', 0, 100, 0, 200, 50, '2000-01-01', '2000-02-01'),
        (2, 2, '2000-01-02', '2000-02-02', 1, 200, 1, 300, 50, '2000-01-02', '2000-02-02'),
        (3, 3, '2000-01-03', '2000-02-03', 0, 300, 0, 400, 50, '2000-01-03', '2000-02-03');
        
    INSERT INTO estimations (service_type, address_id, building_type, family_size, past_consumption, electric_car, wellness, heating_type)
        VALUES 
        (0, 1, 0, 3, 1000, 1, 0, 0),
        (1, 2, 1, 4, 2000, 0, 1, 1),
        (2, 3, 2, 5, 3000, 0, 0, 2);
        
    INSERT INTO customercontracts (start_date, end_date, customer_id, customer_type, advance_payment, price, tariff_id, estimation_id)
        VALUES 
        ('2000-01-01', '2001-01-01', 1, 'customerType1', 1000, 1200, 1, 1),
        ('2001-01-01', '2002-01-01', 2, 'customerType2', 2000, 2200, 2, 2),
        ('2002-01-01', '2003-01-01', 3, 'customerType3', 3000, 3200, 3, 3);
        
    INSERT INTO planning (employee_id, customer_id, date, status)
        VALUES 
        (0, 0, '2000-01-01', 0),
        (1, 1, '2001-01-01', 1),
        (2, 2, '2002-01-01', 0);
`;



